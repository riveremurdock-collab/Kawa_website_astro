/**
 * Generate Route Data
 * Scans each article's MDX body for a <RouteMap gpxFile="..."> block —
 * the same block the article renders in-page — and extracts starting
 * coordinates from the referenced GPX file to build the overview map's
 * route data. The GPX block is the single source of truth: nothing here
 * reads frontmatter for route info.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTICLES_DIR = path.join(__dirname, '../content/articles');
const PUBLIC_DIR = path.join(__dirname, '../../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'data/routes.json');
const ALLOW_EMPTY = process.argv.includes('--allow-empty');

/**
 * Parse top-level YAML-like frontmatter (title, etc.) — no longer looks
 * for gpxRoute, which no longer exists in frontmatter.
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const frontmatter = {};
    const lines = match[1].split('\n');

    for (const line of lines) {
        const kvMatch = line.match(/^(\w+):\s*(.*)$/);
        if (kvMatch) {
            let value = kvMatch[2].trim();
            value = value.replace(/^["']|["']$/g, '');
            frontmatter[kvMatch[1]] = value;
        }
    }

    return frontmatter;
}

/**
 * Find a <RouteMap gpxFile="..."> block anywhere in the MDX body and
 * return its gpxFile prop value, or null if there's no such block.
 */
function extractRouteMapGpxFile(content) {
    const match = content.match(/<RouteMap\b[^>]*\bgpxFile=["']([^"']+)["']/);
    return match ? match[1] : null;
}

/**
 * Extract all track points from GPX file
 */
function extractTrackPoints(gpxContent) {
    const regex = /<trkpt\s+lat=["']([^"']+)["']\s+lon=["']([^"']+)["']/g;
    const points = [];
    let match;
    while ((match = regex.exec(gpxContent)) !== null) {
        points.push([parseFloat(match[1]), parseFloat(match[2])]);
    }
    return points;
}

async function main() {
    console.log('Generating route data...');

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Collect all index.mdx files from subdirectories (folder-per-article layout)
    const entries = fs.readdirSync(ARTICLES_DIR, { withFileTypes: true });
    const mdxFiles = entries
        .filter(e => e.isDirectory())
        .map(e => ({ slug: e.name, filePath: path.join(ARTICLES_DIR, e.name, 'index.mdx') }))
        .filter(({ filePath }) => fs.existsSync(filePath));

    const routes = [];
    const skipped = [];

    for (const { slug, filePath } of mdxFiles) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const frontmatter = parseFrontmatter(content);
        if (!frontmatter) {
            skipped.push(`${slug}: could not parse frontmatter`);
            continue;
        }

        const gpxRelativeFile = extractRouteMapGpxFile(content);
        if (!gpxRelativeFile) {
            if (content.includes('<RouteMap')) {
                skipped.push(`${slug}: found a <RouteMap> tag but couldn't read its gpxFile prop — check it's written as gpxFile="/gpx/your-file.gpx" with straight quotes`);
            }
            continue;
        }

        const gpxPath = path.join(PUBLIC_DIR, gpxRelativeFile.replace(/^\//, ''));

        if (!fs.existsSync(gpxPath)) {
            skipped.push(`${slug}: <RouteMap gpxFile="${gpxRelativeFile}"> references a file that doesn't exist at ${gpxPath}`);
            continue;
        }

        const gpxContent = fs.readFileSync(gpxPath, 'utf-8');
        const trackPoints = extractTrackPoints(gpxContent);

        if (trackPoints.length === 0) {
            skipped.push(`${slug}: no <trkpt lat=".." lon=".."> points found in ${gpxPath}`);
            continue;
        }

        routes.push({
            slug,
            title: frontmatter.title,
            lat: trackPoints[0][0],
            lon: trackPoints[0][1],
            trackPoints,
        });

        console.log(`  Found route: ${frontmatter.title} (${trackPoints.length} points)`);
    }

    skipped.forEach(reason => console.warn(`  Skipped ${reason}`));

    // Write output file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(routes, null, 2));
    console.log(`Generated ${routes.length} route(s) in ${OUTPUT_FILE}`);

    if (routes.length === 0 && !ALLOW_EMPTY) {
        console.error('');
        console.error('ERROR: generate-route-data.js found zero routes.');
        console.error(`Scanned ${mdxFiles.length} article file(s) for a <RouteMap gpxFile="..."> tag in the body:`);
        mdxFiles.forEach(({ slug }) => console.error(`  - ${slug}/index.mdx`));
        if (skipped.length > 0) {
            console.error('Reasons found articles were skipped:');
            skipped.forEach(reason => console.error(`  - ${reason}`));
        }
        console.error('If zero routes is genuinely correct right now, run with --allow-empty.');
        process.exitCode = 1;
        return;
    }
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
