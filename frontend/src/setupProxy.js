const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/oauth2/authorization/google', {
      target: 'https://3.36.108.84:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://3.36.108.84:5000',
      changeOrigin: true,
    })
  );
};
