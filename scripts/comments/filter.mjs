// Decides whether a comment can be published automatically. Returns the
// reasons it can't — an empty list means it's clean.
import { readFileSync } from 'node:fs';

export const MAX_NAME = 60;
export const MAX_COMMENT = 2000;

// Characters people swap in for each letter to dodge filters. "*" covers
// masking (f*ck), and is allowed for any letter except the first.
const VARIANTS = {
  a: 'a4@', e: 'e3', i: 'i1!|', l: 'l1|', o: 'o0', s: 's5$', t: 't7', g: 'g9', b: 'b8',
};

const escape = s => s.replace(/[\\\]^-]/g, '\\$&');

function wordPattern(entry) {
  const prefix = entry.endsWith('*');
  const words = (prefix ? entry.slice(0, -1) : entry).split(/\s+/);

  const body = words.map(word =>
    [...word].map((ch, i) => {
      const chars = escape(VARIANTS[ch] ?? ch) + (i > 0 ? '*' : '');
      return `[${chars}]+`;
    // Dots, dashes and underscores between letters: s.h.i.t, f-u-c-k
    }).join('[._\\-]*'),
  ).join('\\s+');

  return `(?<![\\p{L}\\d])${body}${prefix ? '' : '(?![\\p{L}])'}`;
}

const entries = readFileSync(new URL('./blocklist.txt', import.meta.url), 'utf8')
  .split(/\r?\n/)
  .map(line => line.trim().toLowerCase())
  .filter(line => line && !line.startsWith('#'));

const blocklist = entries.map(entry => ({ entry, re: new RegExp(wordPattern(entry), 'iu') }));

// Links are the main thing spam bots leave behind.
const LINK = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|co|ru|cn|xyz|info|biz|top|shop|site|online|club|link|click)\b)/i;

// Strip accents so "fück" reads as "fuck".
const plain = text => text.normalize('NFKD').replace(/\p{M}/gu, '');

export function checkComment({ name, comment }) {
  const reasons = [];
  for (const [label, text] of [['name', name], ['comment', comment]]) {
    const hit = blocklist.find(({ re }) => re.test(plain(text)));
    if (hit) reasons.push(`${label} matches blocklist entry "${hit.entry}"`);
  }
  if (LINK.test(name) || LINK.test(comment)) reasons.push('contains a link');
  if (name.length > MAX_NAME) reasons.push(`name is over ${MAX_NAME} characters`);
  if (comment.length > MAX_COMMENT) reasons.push(`comment is over ${MAX_COMMENT} characters`);
  return reasons;
}
