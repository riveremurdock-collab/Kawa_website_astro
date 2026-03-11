/**
 * Generate Route Data
 * Extracts starting coordinates from GPX files referenced in article frontmatter
 * and generates a JSON file for the overview map.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTICLES_DIR = path.join(__dirname, '../content/articles');
const PUBLIC_DIR = path.join(__dirname, '../../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'data/routes.json');

/**
 * Parse YAML-like frontmatter from MDX content
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const frontmatter = {};
    const lines = match[1].split('\n');
    let currentKey = null;
    let inGpxRoute = false;

    for (const line of lines) {
        // Check for gpxRoute block
        if (line.match(/^gpxRoute:\s*$/)) {
            inGpxRoute = true;
            frontmatter.gpxRoute = {};
            continue;
        }

        if (inGpxRoute) {
            // Check for nested key under gpxRoute
            const nestedMatch = line.match(/^\s{2}(\w+):\s*(.*)$/);
            if (nestedMatch) {
                let value = nestedMatch[2].trim();
                // Remove quotes
                value = value.replace(/^["']|["']$/g, '');
                frontmatter.gpxRoute[nestedMatch[1]] = value;
                continue;
            }
            // If line doesn't start with spaces, we're out of gpxRoute
            if (!line.match(/^\s/)) {
                inGpxRoute = false;
            }
        }

        // Parse top-level key-value pairs
        const kvMatch = line.match(/^(\w+):\s*(.*)$/);
        if (kvMatch && !inGpxRoute) {
            let value = kvMatch[2].trim();
            // Remove quotes
            value = value.replace(/^["']|["']$/g, '');
            frontmatter[kvMatch[1]] = value;
        }
    }

    return frontmatter;
}

/**
 * Extract first track point coordinates from GPX file
 */
function extractFirstTrackPoint(gpxContent) {
    // Match first <trkpt> element
    const match = gpxContent.match(/<trkpt\s+lat=["']([^"']+)["']\s+lon=["']([^"']+)["']/);
    if (!match) return null;

    return {
        lat: parseFloat(match[1]),
        lon: parseFloat(match[2])
    };
}

/**
 * Get slug from filename
 */
function getSlugFromFilename(filename) {
    return filename.replace(/\.mdx?$/, '');
}

async function main() {
    console.log('Generating route data...');

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Read all MDX files in articles directory
    const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.mdx'));
    const routes = [];

    for (const file of files) {
        const filePath = path.join(ARTICLES_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const frontmatter = parseFrontmatter(content);

        if (!frontmatter || !frontmatter.gpxRoute || !frontmatter.gpxRoute.file) {
            continue;
        }

        // Get GPX file path (relative to public directory)
        const gpxRelativePath = frontmatter.gpxRoute.file.replace(/^\//, '');
        const gpxPath = path.join(PUBLIC_DIR, gpxRelativePath);

        if (!fs.existsSync(gpxPath)) {
            console.warn(`GPX file not found: ${gpxPath}`);
            continue;
        }

        // Parse GPX and extract first track point
        const gpxContent = fs.readFileSync(gpxPath, 'utf-8');
        const coords = extractFirstTrackPoint(gpxContent);

        if (!coords) {
            console.warn(`Could not extract coordinates from: ${gpxPath}`);
            continue;
        }

        const slug = getSlugFromFilename(file);

        routes.push({
            slug,
            title: frontmatter.title,
            lat: coords.lat,
            lon: coords.lon
        });

        console.log(`  Found route: ${frontmatter.title} (${coords.lat}, ${coords.lon})`);
    }

    // Write output file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(routes, null, 2));
    console.log(`Generated ${routes.length} route(s) in ${OUTPUT_FILE}`);
}

main().catch(console.error);
