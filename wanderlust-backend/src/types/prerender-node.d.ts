declare module 'prerender-node' {
  import { RequestHandler } from 'express';

  interface PrerenderMiddleware extends RequestHandler {
    set(key: string, value: string): PrerenderMiddleware;
    whitelist(paths: string[]): PrerenderMiddleware;
    blacklisted(paths: string[]): PrerenderMiddleware;
  }

  const prerender: PrerenderMiddleware;
  export = prerender;
}