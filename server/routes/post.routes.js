let express = require('express');
let router = express.Router();

// eslint-disable-next-line no-unused-vars
let { Post, Message, PostAccess}  = require('../models/post.js');

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

router.route('/').get((req, res,next) => {
  Post.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

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
})

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
})

module.exports = router;