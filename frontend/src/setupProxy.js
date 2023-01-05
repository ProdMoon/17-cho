const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/oauth2/authorization/google', {
      target: 'http://192.168.0.62:5000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://192.168.0.62:5000',
      changeOrigin: true,
    })
  );
};
