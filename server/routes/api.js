let express = require('express');
let router = express.Router();
// const admin = require('firebase-admin');


// let auth = require('../auth_modules/server_auth');

//Handles all auth before allowing access to API
// router.use(auth);

// eslint-disable-next-line no-unused-vars
let { Post, Message, PostAccess, Test}  = require('../models/post.js');

let { User}  = require('../models/user.js');

let { Loop, UserConnection } = require('../models/loop.js');

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
      if (error.name == "ValidationError") {
        res.status(400)
        res.send("ValidationError")
      }
        // console.log(error)
      return next(error)
    } else {
      // console.log(data)
      res.json(data)
    }
  })
});

router.route('/test').post((req, res, next) =>{
  Test.create(req.body, (error, data) =>{
    if (error) {
      if (error.name == "ValidationError") {
        res.status(400)
        res.send("ValidationError")
      }
      // console.log(error)
    return next(error)
  } else {
    // console.log(data)
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

router.route('/update-post/:id').post((req, res, next) => {
  Post.findOneAndUpdate({"postId": req.params.id}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      if (error.name == "ValidationError") {
        res.status(400)
        res.send("ValidationError")
      }
      return next(error);
    } else {
      res.json(data)
      // console.log('Post updated successfully !')
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
      if (error.name == "ValidationError") {
        res.status(400)
        res.send("ValidationError")
      }
      return next(error)
    } else {
      // console.log(data)
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
      // console.log('User updated successfully !');
    }
  })
});

// /users/create
router.route('/users/create').post((req, res, next) => {
  User.create(req.body, (error, data) => {
  if (error) {
      // console.log(error)
    return next(error)
  } else {
    // console.log(data)
    res.json(data)
  }
})
});
// /users/:user_id/add_friend //TODO
router.route('/users/:user_id/add_friend').post((req, res, next) => {
  UserConnection.create(req.body, (error, data) => {
  if (error) {
    if (error.name == "ValidationError") {
      res.status(400)
      res.send("ValidationError")
    }
      // console.log(error)
    return next(error)
  } else {
    // console.log(data)
    res.json(data)
  }
})
});
// /users/:user_id/create_loop
router.route('/users/:user_id/create_loop').post((req, res, next) => {
  Loop.create(req.body, (error, data) => {
  if (error) {
    if (error.name == "ValidationError") {
      res.status(400)
      res.send("ValidationError")
    }
      // console.log(error)
    return next(error)
  } else {
    // console.log(data)
    res.json(data)
  }
})
});
// /loops/:loop_id/update
router.route('/loops/:loop_id/update').post((req, res, next) => {
  Loop.findOneAndUpdate({"loop_id": req.params.loop_id}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      if (error.name == "ValidationError") {
        res.status(400)
        res.send("ValidationError")
      }
      return next(error);
    } else {
      res.json(data)
      // console.log('Loop updated successfully !')
    }
  })
});
// /users/:user_id/send_message
router.route('/users/:user_id/send_message').post((req, res, next) => {
  Message.create(req.body, (error, data) => {
  if (error) {
      // console.log(error)
    return next(error)
  } else {
    // console.log(data)
    res.json(data)
  }
})
});
// /users/:user_id/show_messages
router.route('/users/:user_id/show_messages').get((req, res,next) => {
  Message.find({"senderId": req.params.user_id, "receivingUserId": req.body.receivingUserId },(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// /users/:user_id/create_post
router.route('/users/:user_id/create_post').post((req, res, next) => {
  Post.create(req.body, (error, data) => {
  if (error) {
    if (error.name == "ValidationError") {
      res.status(400)
      res.send("ValidationError")
    }
      // console.log(error)
    return next(error)
  } else {
    // console.log(data)
    res.json(data)
  }
})
});
// /users/:user_id/user_posts
router.route('/users/:user_id/user_posts').get((req, res, next) => {
  Post.find({"senderId": req.params.user_id}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
});
// /posts/:post_id/delete
router.route('/posts/:post_id/delete').delete((req, res, next) => {
  Post.findOneAndDelete({'_id': req.params.post_id} , (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});
// /users/:user_id/posts
router.route('/users/:user_id/posts').get((req, res, next) => {
  PostAccess.find({"user_id": req.params.user_id}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
});
module.exports = router;