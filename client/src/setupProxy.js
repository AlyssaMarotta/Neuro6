const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/api' ], { target: 'http://localhost:5000' }));
}
