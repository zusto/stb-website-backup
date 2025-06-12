import { SitemapStream, streamToPromise, SitemapItem, EnumChangefreq } from 'sitemap';
import { writeFile } from 'fs/promises';
import { Readable } from 'stream';

// Define custom type with required properties
type SitemapURL = Pick<SitemapItem, 'url' | 'changefreq' | 'priority'>;

const SITE_URLS: SitemapURL[] = [
    { url: '/', changefreq: EnumChangefreq.DAILY, priority: 1.0 },
    { url: '/checkout', changefreq: EnumChangefreq.DAILY, priority: 0.9 },
    { url: '/ambassador-application', changefreq: EnumChangefreq.WEEKLY, priority: 0.8 },
    { url: '/freebies', changefreq: EnumChangefreq.WEEKLY, priority: 0.8 },
    { url: '/flyer', changefreq: EnumChangefreq.WEEKLY, priority: 0.7 },
    { url: '/flyer2', changefreq: EnumChangefreq.WEEKLY, priority: 0.7 },
    { url: '/flyer3', changefreq: EnumChangefreq.WEEKLY, priority: 0.7 }
];

async function generateSitemap() {
    try {
        // Create sitemap stream
        const smStream = new SitemapStream({
            hostname: 'https://studenttravelbuddy.com'
        });

        // Create a readable stream and pipe to sitemap
        const stream = Readable.from(SITE_URLS).pipe(smStream);

        // Generate sitemap XML
        const data = await streamToPromise(stream);
        
        // Write uncompressed XML file
        await writeFile('/home/studenttravelbuddy.com/public_html/node-app/dist/sitemap.xml', data);
        
        console.log('✅ Sitemap XML generated successfully!');
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
    }
}

export default generateSitemap;