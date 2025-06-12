import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();
router.get('/prerender', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res.status(400).json({ error: 'URL parameter required' });
        }
        const prerenderUrl = `https://service.prerender.io/${url}`;
        const response = await fetch(prerenderUrl, {
            headers: {
                'X-Prerender-Token': process.env.PRERENDER_TOKEN || '5SCBI9hhXmLNcXyBvmmx',
                'User-Agent': req.headers['user-agent'] || ''
            }
        });
        const html = await response.text();
        res.send(html);
    }
    catch (error) {
        console.error('🔥 Prerender error:', error);
        res.status(500).json({ error: 'Prerender service error' });
    }
});
export default router;
