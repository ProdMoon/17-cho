const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/oauth2/authorization/google', {
      target: 'http://3.36.108.84:8080',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://3.36.108.84:8080',
      changeOrigin: true,
    })
  );
};
