import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';

export const GET: APIRoute = async () => {
    const articles = await getCollection('articles');
    const routes = [];

    for (const article of articles) {
        const gpxFile = article.data.gpxRoute?.file;
        if (!gpxFile) continue;

        const gpxPath = path.join(process.cwd(), 'public', gpxFile);

        try {
            const gpx = await fs.readFile(gpxPath, 'utf-8');

            // Extract all track points
            const trackPointRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)"/g;
            const trackPoints: [number, number][] = [];
            let match;
            while ((match = trackPointRegex.exec(gpx)) !== null) {
                trackPoints.push([parseFloat(match[1]), parseFloat(match[2])]);
            }

            if (trackPoints.length === 0) continue;

            routes.push({
                slug: article.slug,
                title: article.data.title,
                lat: trackPoints[0][0],
                lon: trackPoints[0][1],
                trackPoints
            });
        } catch {
            // GPX file missing or unreadable — skip this article
        }
    }

    return new Response(JSON.stringify(routes), {
        headers: { 'Content-Type': 'application/json' }
    });
};
