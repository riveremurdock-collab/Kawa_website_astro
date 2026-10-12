// Moves new comments from Netlify Forms onto the site.
//
// Runs on a schedule from .github/workflows/comments.yml:
//   1. Fetch submissions to the "comments" Netlify form.
//   2. Clean ones are queued to publish. Ones the filter catches (filter.mjs)
//      become a GitHub issue labelled "comment-review"; adding the "approved"
//      label queues it to publish, closing the issue rejects it.
//   3. If anything is queued and the deploy caps allow, add it to
//      src/data/comments.json and push — Netlify rebuilds on the push.
//      Otherwise nothing changes, and the queue waits for the next run.
//
// Every deploy costs Netlify credits, so the caps are counted from this
// bot's own commits in git history. Your own pushes don't count against them.
//
// Env: NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID, GITHUB_TOKEN, GITHUB_REPOSITORY
// (the last two are set automatically in GitHub Actions).
// Pass --dry-run to only print what would happen.
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { checkComment, MAX_NAME } from './filter.mjs';

// ---- Settings ----
const TIME_ZONE = 'America/Denver';   // what "a day" means for the caps
const MAX_DEPLOYS_PER_DAY = 1;
const MAX_DEPLOYS_PER_MONTH = 10;     // ×15 credits = 150 of the free 300
const SITE_URL = 'https://kawadesign.us';

const FORM_NAME = 'comments';
const BOT_NAME = 'kawa-comments-bot';
const BOT_EMAIL = 'kawa-comments-bot@users.noreply.github.com';
const REVIEW_LABEL = 'comment-review';
const APPROVED_LABEL = 'approved';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const DATA_FILE = path.join(ROOT, 'src/data/comments.json');
const ARTICLES_DIR = path.join(ROOT, 'src/content/articles');
const DRY_RUN = process.argv.includes('--dry-run');

const { NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID, GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env;

// ---------- APIs ----------

async function request(url, init = {}) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${url} → ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

const netlify = pathname => request(`https://api.netlify.com/api/v1${pathname}`, {
  headers: { Authorization: `Bearer ${NETLIFY_AUTH_TOKEN}` },
});

const github = (method, pathname, body) => request(
  `https://api.github.com/repos/${GITHUB_REPOSITORY}${pathname}`,
  {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
      ...(body && { 'Content-Type': 'application/json' }),
    },
    body: body && JSON.stringify(body),
  },
);

async function fetchSubmissions() {
  const forms = await netlify(`/sites/${NETLIFY_SITE_ID}/forms`);
  const form = forms.find(f => f.name === FORM_NAME);
  if (!form) {
    console.log(`No "${FORM_NAME}" form on Netlify yet — has the site been deployed with form detection on?`);
    return [];
  }
  const all = [];
  for (let page = 1; page <= 50; page++) {
    const batch = await netlify(`/forms/${form.id}/submissions?per_page=100&page=${page}`);
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

async function fetchReviewIssues() {
  const all = [];
  for (let page = 1; page <= 50; page++) {
    const batch = await github('GET', `/issues?labels=${REVIEW_LABEL}&state=all&per_page=100&page=${page}`);
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

async function ensureLabel(name, color, description) {
  try {
    await github('POST', '/labels', { name, color, description });
  } catch (err) {
    if (!String(err).includes('already_exists')) throw err;
  }
}

// ---------- Comments ----------

const MARKER = /<!-- kawa-comment ([A-Za-z0-9+/=]+) -->/;

function fromSubmission(sub) {
  const data = sub.data ?? {};
  return {
    id: sub.id,
    page: String(data.page ?? '').trim(),
    name: String(data.name ?? '').trim().slice(0, MAX_NAME * 2),
    comment: String(data.comment ?? '').replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim(),
    date: sub.created_at,
  };
}

function fromIssue(issue) {
  const match = issue.body?.match(MARKER);
  return match ? JSON.parse(Buffer.from(match[1], 'base64').toString('utf8')) : null;
}

/** Why a submission can't be shown at all (not a moderation call). */
function invalid({ page, name, comment }) {
  if (!name || !comment) return 'empty name or comment';
  if (!/^[a-z0-9-]+$/.test(page)) return `bad page "${page}"`;
  const exists = page === 'guestbook'
    || existsSync(path.join(ARTICLES_DIR, page))
    || existsSync(path.join(ARTICLES_DIR, `${page}.mdx`));
  return exists ? null : `no page called "${page}"`;
}

const pageUrl = page => page === 'guestbook' ? `${SITE_URL}/guestbook` : `${SITE_URL}/articles/${page}`;
const quote = text => text.split('\n').map(line => `> ${line}`).join('\n');

async function openReviewIssue(c, reasons) {
  const body = [
    `**Page:** [${c.page}](${pageUrl(c.page)})`,
    `**Submitted:** ${c.date}`,
    `**Flagged because:** ${reasons.join('; ')}`,
    '',
    '**Name**',
    quote(c.name),
    '',
    '**Comment**',
    quote(c.comment),
    '',
    '---',
    `To publish it, add the \`${APPROVED_LABEL}\` label. To reject it, close this issue.`,
    '',
    `<!-- kawa-comment ${Buffer.from(JSON.stringify(c)).toString('base64')} -->`,
  ].join('\n');

  const issue = await github('POST', '/issues', {
    title: `Comment to review on "${c.page}" from ${c.name.slice(0, 40)}`,
    body,
    labels: [REVIEW_LABEL],
  });
  console.log(`Flagged ${c.id} (${reasons.join('; ')}) → issue #${issue.number}`);
}

// ---------- Deploy caps ----------

const dayKey = date => new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
}).format(date); // YYYY-MM-DD

const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' });

function deploysUsed() {
  const today = dayKey(new Date());
  const days = git('log', `--author=${BOT_EMAIL}`, '--since=40 days ago', '--format=%cI')
    .split('\n').filter(Boolean).map(iso => dayKey(new Date(iso)));
  return {
    today: days.filter(d => d === today).length,
    month: days.filter(d => d.slice(0, 7) === today.slice(0, 7)).length,
  };
}

function commitAndPush(count) {
  git('add', DATA_FILE);
  git('-c', `user.name=${BOT_NAME}`, '-c', `user.email=${BOT_EMAIL}`,
    'commit', '-m', `comments: publish ${count} new comment${count === 1 ? '' : 's'}`);
  try {
    git('push');
  } catch {
    // Someone pushed since checkout — replay on top and try once more.
    git('pull', '--rebase');
    git('push');
  }
}

// ---------- Main ----------

async function main() {
  for (const [name, value] of Object.entries({ NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID, GITHUB_REPOSITORY })) {
    if (!value) throw new Error(`Missing ${name}`);
  }
  if (!GITHUB_TOKEN && !DRY_RUN) throw new Error('Missing GITHUB_TOKEN');

  const data = JSON.parse(await readFile(DATA_FILE, 'utf8'));
  const published = new Set(data.comments.map(c => c.id));
  const known = new Set([...published, ...data.skipped]);

  if (!DRY_RUN) {
    await ensureLabel(REVIEW_LABEL, 'f78f28', 'A comment the filter caught — approve or close');
    await ensureLabel(APPROVED_LABEL, '717045', 'Publish this comment on the next run');
  }

  // Everything that already has an issue, open or closed, has been handled.
  const issues = await fetchReviewIssues();
  const approved = [];
  for (const issue of issues) {
    const c = fromIssue(issue);
    if (!c) continue;
    known.add(c.id);
    if (issue.state === 'open' && issue.labels.some(l => l.name === APPROVED_LABEL)) {
      approved.push({ issue: issue.number, comment: c });
    }
  }

  const toPublish = approved.filter(a => !published.has(a.comment.id)).map(a => a.comment);
  const toSkip = [];

  const submissions = (await fetchSubmissions()).filter(s => !known.has(s.id));
  for (const sub of submissions) {
    const c = fromSubmission(sub);
    const problem = invalid(c);
    if (problem) {
      console.log(`Skipping ${c.id}: ${problem}`);
      toSkip.push(c.id);
      continue;
    }
    const reasons = checkComment(c);
    if (reasons.length === 0) toPublish.push(c);
    else if (DRY_RUN) console.log(`Would flag ${c.id}: ${reasons.join('; ')}`);
    else await openReviewIssue(c, reasons);
  }

  console.log(`${toPublish.length} comment(s) ready to publish.`);
  if (toPublish.length === 0) return;

  const used = deploysUsed();
  console.log(`Bot deploys used: ${used.today}/${MAX_DEPLOYS_PER_DAY} today, ${used.month}/${MAX_DEPLOYS_PER_MONTH} this month.`);
  if (used.today >= MAX_DEPLOYS_PER_DAY || used.month >= MAX_DEPLOYS_PER_MONTH) {
    console.log('Deploy cap reached — they stay queued for a later run.');
    return;
  }

  data.comments.push(...toPublish);
  data.comments.sort((a, b) => a.date.localeCompare(b.date));
  data.skipped.push(...toSkip);

  if (DRY_RUN) {
    for (const c of toPublish) console.log(`Would publish on ${c.page}: ${c.name}: ${c.comment.slice(0, 80)}`);
    return;
  }

  await writeFile(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
  commitAndPush(toPublish.length);
  console.log(`Published ${toPublish.length} comment(s).`);

  for (const { issue } of approved) {
    await github('POST', `/issues/${issue}/comments`, { body: 'Published — it will be live once the site finishes deploying.' });
    await github('PATCH', `/issues/${issue}`, { state: 'closed', state_reason: 'completed' });
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
