const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // 如果请求以 /api 开头，则代理到 Django 后端
    if (pathname.startsWith('/api')) {
      const proxy = createProxyMiddleware({
        target: 'http://117.72.9.86:7777',
        changeOrigin: true,
      });
      proxy(req, res);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});
