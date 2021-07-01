import { createServer } from 'http';
import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
const __dirname = path.resolve();
dotenv.config();

import './core/db.js';
import createRoutes from './core/routes.js';
import createSocket from './core/socket.js';

const app = express();
const http = createServer(app);
const io = createSocket(http);
createRoutes(app, io);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'chat-front/build')));
  // Handle React routing, return all requests to React app
  app.get('/', function (req, res) {
    res.sendFile(path.join(appRoot, 'chat-front/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3003;

http.listen(PORT, function () {
  console.log(`Server: http://localhost:${PORT}`);
});
