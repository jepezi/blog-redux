import 'isomorphic-fetch';
import express from 'express';
import handleAuthBasic, { authFilter } from './handlers/authBasic';




// admin mini-app
const admin = express.Router();
handleAuthBasic(admin);




// Catch-all
const stat = {
  publicPath: 'http://localhost:3001/dist/',
  assetsByChunkName: {
    admin: 'admin.js'
  }
};

const AdminRendererClass = require('./renderer/simplerenderer.js')('admin.html');

const adminStat = __DEVELOPMENT__
  ? stat
  : require('../webpack-admin-stats.json');

// create renderer
const adminRenderer = new AdminRendererClass({
  cssUrl: adminStat.publicPath + [].concat(adminStat.assetsByChunkName.admin)[1],
  scriptUrl: adminStat.publicPath + [].concat(adminStat.assetsByChunkName.admin)[0],
  vendorUrl: adminStat.publicPath + [].concat(adminStat.assetsByChunkName.adminVendor)[0],
});

admin.get('*', authFilter, (req, res) => {
  adminRenderer.render(req, (err, redirect, html) => {
    if (err) {
      res.statusCode = 500;
      res.contentType = 'text; charset=utf8';
      res.end(err.message);
      return;
    }
    if (redirect) {
      res.redirect(301, redirect.pathname + redirect.search);
      return;
    }
    res.contentType = 'text/html; charset=utf8';
    res.end(html.replace('__DATA__', JSON.stringify(req.session.user)));
  });
});




module.exports = admin;
