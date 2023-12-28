const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		const { pathname } = parsedUrl;

		// Proxy requests to /api and /user to the Django backend
		if (pathname.startsWith("/api/") || pathname.startsWith("/user/")) {
			const proxy = createProxyMiddleware({
				target: "http://127.0.0.1:8000", // Your Django server address
				changeOrigin: true,
				pathRewrite: {
					"^/api/": "/api/", // Rewrite the path for general API requests
					"^/user/": "/user/", // Rewrite the path for user-related requests
				},
			});
			proxy(req, res);
		} else {
			handle(req, res, parsedUrl);
		}
	}).listen(3000, () => {
		console.log("> Ready on http://localhost:3000");
	});
});
