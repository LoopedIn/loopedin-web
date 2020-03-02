const express = require('express');

const admin = require('firebase-admin');

const app = express();

app.post('/login/sessionLogin', (req, res) => {
  // Get the ID token passed and the CSRF token.
  const idToken = req.body.idToken.toString();
  const csrfToken = req.body.csrfToken.toString();
  // Guard against CSRF attacks.
  if (csrfToken !== req.cookies.csrfToken) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
    return;
  }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({ status: 'success' }));
      },
      (error) => {
        console.log(error);
        res.status(401).send('UNAUTHORIZED REQUEST!');
      },
    );
});

app.get('/login/post_login_req', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      console.log(decodedClaims);
      res.json({ can_access: 'true' });
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/login');
    });
});

module.exports = app;
