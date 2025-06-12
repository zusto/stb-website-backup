import fetch from 'node-fetch';

const prerenderMiddleware = async (req, res, next) => {
  try {
    const userAgent = req.get('user-agent') || '';
    const botPattern = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot/i;

    if (botPattern.test(userAgent)) {
      const prerenderUrl = `http://service.prerender.io/https://studenttravelbuddy.com${req.path}`;
      const response = await fetch(prerenderUrl, {
        headers: {
          'X-Prerender-Token': '5SCBI9hhXmLNcXyBvmmx'
        }
      });

      if (response.ok) {
        const html = await response.text();
        return res.send(html);
      }
    }
    next();
  } catch (error) {
    console.error('Prerender error:', error);
    next();
  }
};

export default prerenderMiddleware;