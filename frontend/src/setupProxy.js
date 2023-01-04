const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/oauth2/authorization/google', {
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
