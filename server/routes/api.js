let express = require('express');
let router = express.Router();
// const admin = require('firebase-admin');

// admin.initializeApp({
//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
//   credential: admin.credential.cert({
//       projectId: '<PROJECT_ID>',
//       clientEmail: 'foo@<PROJECT_ID>.iam.gserviceaccount.com',
//       privateKey: '-----BEGIN PRIVATE KEY-----\n<KEY>\n-----END PRIVATE KEY-----\n'
//   })
// });

// let auth = require('../auth_modules/server_auth');

//Handles all auth before allowing access to API
// router.use(auth);

// eslint-disable-next-line no-unused-vars
let { Post, Message, PostAccess, Test}  = require('../models/post.js');

let { User}  = require('../models/user.js');

let {Loop, userConnection} = require('../models/loop.js');

// router.route('/login/sessionLogin').post((req, res) => {
//   // Get the ID token passed and the CSRF token.
//   const idToken = req.body.idToken.toString();
//   // const csrfToken = req.body.csrfToken.toString();
//   // // Guard against CSRF attacks.
//   // if (csrfToken !== req.cookies.csrfToken) {
//   //   res.status(401).send('UNAUTHORIZED REQUEST!');
//   //   return;
//   // }
//   console.log(idToken);
//   // Set session expiration to 5 days.
//   const expiresIn = 60 * 60 * 24 * 5 * 1000;

//   admin
//     .auth()
//     .createSessionCookie(idToken, { expiresIn })
//     .then(
//       (sessionCookie) => {
//         // Set cookie policy for session cookie.
//         const options = { maxAge: expiresIn, httpOnly: true, secure: true };
//         res.cookie('session', sessionCookie, options);
//         res.end(JSON.stringify({ status: 'success' }));
//       },
//       (error) => {
//         console.log(error);
//         res.status(401).send('UNAUTHORIZED REQUEST!');
//       },
//     );
// });


router.route('/create-post').post((req, res, next) => {
    Post.create(req.body, (error, data) => {
    if (error) {
        console.log(error)
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

router.route('/test').post((req, res, next) =>{
  Test.create(req.body, (error, data) =>{
    if (error) {
      console.log(error)
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
  })
});

router.route('/').get((req, res,next) => {
  Post.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

router.route('/update-post/:id').put((req, res, next) => {
  Post.findOneAndUpdate({"postId": req.params.id}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Post updated successfully !')
    }
  })
});

router.route('/delete-post/:id').delete((req, res, next) => {
  Post.findOneAndDelete({'postId': req.params.id} , (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});

router.route('/users/create/').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
        console.log(error)
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  });
});

router.route('/users/:id/');

router.route('/users/:id/update').post((req, res, next) => {
  Post.findOneAndUpdate({"userId": req.params.id}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log('User updated successfully !');
    }
  })
});

// /users/create
// /users/:user_id/add_friend
// /users/:user_id/create_loop
// /loops/:loop_id/update
// /users/:user_id/send_message
// /users/:user_id/show_messages
// /users/:user_id/create_post
// /users/:user_id/user_posts
// /posts/:post_id/delete
// /users/:user_id/posts

module.exports = router;