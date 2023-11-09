import routes from '@config/routes.js';
import expressMiddleware from '@root/config/middlewares/expressMiddleware.js';
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
const app = express();

// Express Middleware
expressMiddleware(app, express);

app.get('/', (req, res) => {
   res.send('Gateway service is running');
});

app.get('/healthcheck', (req, res) => {
   res.send({});
});

routes.forEach(route => {
   app.use(createProxyMiddleware(route.endpoint, route.proxy));
});

// Catch-all route for undefined routes
app.all('*', (req, res) => {
   res.status(404).send('Page not found');
});

export default app;