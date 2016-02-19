import path from 'path';
import fs from 'fs';
import express from 'express';
import handleAuthBasic, { authFilter } from './handlers/authBasic';

// admin mini-app
const admin = express.Router();
handleAuthBasic(admin);




// Dashboard - GET
admin.get('*', authFilter, (req, res) => {
  const htmlPath = path.join(__dirname, '..', 'public', 'admin.html');
  // Read html file
  let html = fs.readFileSync(htmlPath, "utf-8");
  // Replace __DATA__ placeholder with user data
  html = html
    .replace('__DATA__', JSON.stringify(req.session.user));

  res.contentType = 'text/html; charset=utf8';
  res.end(html);
});




module.exports = admin;
