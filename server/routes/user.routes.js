// routes/index.js
const express = require('express');

const admin = require('firebase-admin');

const app = express();

app.post('/profile', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      serveContentForUser('/profile', req, res, decodedClaims);
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/login');
    });
});
