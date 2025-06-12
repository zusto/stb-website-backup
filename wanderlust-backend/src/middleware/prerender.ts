import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
import logger from '../utils/logger';

export const prerenderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.get('user-agent') || '';
  const botPattern = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot/i;

  // Skip API and asset routes
  if (req.path.startsWith('/api/') || req.path.startsWith('/assets/')) {
    return next();
  }

  logger.info(`Checking request: ${req.path} - ${userAgent}`);

  if (botPattern.test(userAgent)) {
    try {
      const prerenderUrl = `https://service.prerender.io/https://studenttravelbuddy.com${req.path}`;
      logger.info(`Fetching from Prerender.io: ${prerenderUrl}`);

      const response = await fetch(prerenderUrl, {
        headers: {
          'X-Prerender-Token': '5SCBI9hhXmLNcXyBvmmx',
          'User-Agent': userAgent
        }
      });

      if (!response.ok) {
        throw new Error(`Prerender.io returned ${response.status}`);
      }

      const html = await response.text();
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    } catch (error) {
      logger.error('Prerender error:', error);
    }
  }

  next();
};

export default prerenderMiddleware;