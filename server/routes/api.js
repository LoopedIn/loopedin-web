const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const serverAuth = require('../auth_modules/server_auth.js');
const mongoose = require('mongoose');
const router = express.Router();

// eslint-disable-next-line no-unused-vars
const { Post, Message, PostAccess, Test } = require('../models/post.js');

const { User } = require('../models/user.js');

const { Loop, UserConnection } = require('../models/loop.js');

router.use(cors());
router.use(cookieParser());

//Declaring here as unauthenticated
router.route('/users/create/').post((req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    const error = 'The data to create user is not present';
    return next(error);
  }

  User.create(req.body, (error, data) => {
    if (error) {
      if (error.name === 'ValidationError') {
        res.status(400);
        res.send('ValidationError');
      }
      res.status(400).send(error);
      return next(error);
    }
    // [TODO] : Create a session and send it along with db data
    console.log(data);

    res.json(data);
  });
});

//Registering authenticated middleware
router.use(serverAuth.firebaseTokenAuthenticator);

router.route('/create-post').post((userId, req, res, next) => { 
  // [TODO] Get user id from session
  const userID = '';
  if (Object.keys(req.body).length === 0) {
    const error = 'Data not present in POST request body';
    return next(error);
  }

  const postObject = req.body;
  postObject.senderId = userID;
  Post.create(postObject, (error, data) => {
    if (error) {
      if (error.name === 'ValidationError') {
        res.status(400);
        res.send('ValidationError');
      }
      // console.log(error)
      return next(error);
    }
    // console.log(data)
    res.json(data);
  });
});

router.route('/update-post/:id').post((userId, req, res, next) => {
  // [TODO] Get user id from session
  const userID = '';
  Post.findOneAndUpdate(
    { postId: req.params.id },
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        if (error.name === 'ValidationError') {
          res.status(400);
          res.send('ValidationError');
        }
        return next(error);
      }
      res.json(data);
      // console.log('Post updated successfully !')
    },
  );
});

router.route('/delete-post/:id').delete((userId, req,res, next) => {
  // [TODO] Get user id from session
  const userID = '';
  Post.findOneAndDelete({ postId: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    }
    res.status(200).json({
      msg: data,
    });
  });
});



router.route('/post/updatepost').post((userId, req,res, next) => {
  // [TODO] Get user id from session for validation

  // senderId is the _id object of user
  const { senderId, body } = req.body;
  Post.findOneAndUpdate(
    { senderId },
    {
      $set: body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      }

      res.json(data);
      // console.log('User updated successfully !');
    },
  );
});

// Create a loop for a user
router.route('/users/create_loop').post((userId, req,res, next) => {
  const { body } = req;
  // [TODO] : get user id from session for validation

  if (Object.keys(body).length === 0) {
    const error = 'The loop object to create loop is not present';
    res.status(400).send(error);
    return next(error);
  }

  const loopObject = req.body.loop;
  loopObject.userId = mongoose.Types.ObjectId(loopObject.userId);
  Loop.create(loopObject, (error, data) => {
    if (error) {
      if (error.name === 'ValidationError') {
        res.status(400).send('ValidationError');
        // res.send("ValidationError")
      }
      console.log(error);
      return next(error);
    }
    // console.log(data)
    res.status(200).json(data);
  });
});

// Get the loops the user has created
router.route('/loops').post((userId, req,res, next) => {
  // [TODO] get user id from session for validation
  // userID is the _id object of the user
  let { userID } = req.body;
  userID = mongoose.Types.ObjectId(userID);
  Loop.find({ userId: userID }, (error, data) => {
    if (error) {
      res.status(400);
      return next(error);
    }

    console.log(data);
    res.json(data);
  });
});

// update loop of a user
router.route('/loops/:loop_id/update_loop').post((userId, req,res, next) => {
  // [TODO] Get user id from session
  // const userID = '';
  const { body } = req;
  if (Object.keys(body).length === 0) {
    const error = 'Data not present in POST request body';
    return next(error);
  }

  let loopID = req.params.loop_id;
  const { contacts } = req.body.loop;
  if (Object.keys(contacts).length === 0) {
    const error = 'Contacts Details cannot be empty';
    res.status(400).statusMessage(error);
    return next(error);
  }
  loopID = mongoose.Types.ObjectId(loopID);
  // Update the members of the loop of a user
  Loop.update(
    { _id: loopID },
    { $set: { receivingUsers: contacts } },
    (error, response) => {
      if (error) {
        res.status(400).statusMessage(error);
        return next(error);
      }
      res.status(200).send(response);
    },
  );
});

// Return the members of a loop for a user
router.route('/loops/:loop_id/get_contacts').post((userId, req,res, next) => {
  let { loop_id } = req.params;
  // [TODO] Get user id from session for validation
  // const userID = '';
  loop_id = mongoose.Types.ObjectId(loop_id);
  Loop.find({ _id: loop_id }, { receivingUsers: 1 }, (error, response) => {
    if (error) {
      res.status(400).send(error);
      return next(error);
    }

    res.send(response);
  });
});

// Stores a message send from one user to another
router.route('/users/send_message').post((userId, req,res, next) => {
  // [TODO] Get user id from session
  // const userID = '';
  const { MessageObject } = req.body;
  MessageObject.senderId = mongoose.Types.ObjectId(MessageObject.senderId);
  Message.create(MessageObject, (error, data) => {
    if (error) {
      console.log(error);
      res.status(400).send(error);
      return next(error);
    }
    console.log(data);
    res.json(data);
  });
});

// Get list of messages between two persons
router.route('/users/show_messages_persons').post((userId, req,res, next) => {
  // [TODO] Get user id from session for validation
  // const userID = '';
  if (Object.keys(req.body).length === 0) {
    const error = 'Data not present in POST request body';
    res.status(400).send(error);
    return next(error);
  }
  const senderId = mongoose.Types.ObjectId(req.body.senderId);
  const receivingUserId = mongoose.Types.ObjectId(req.body.receivingUserId);
  const { pageNumber } = req.body;
  const { numberOfItems } = req.body;
  // eslint-disable-next-line max-len
  // Formula to paginate : skip(NUMBER_OF_ITEMS * (PAGE_NUMBER - 1)).limit(NUMBER_OF_ITEMS )
  // Initial Value (Example) :  PAGE_NUMBER=1, NUMBER_OF_ITEMS=10
  Message.find(
    { senderId, receivingUserId },
    null,
    { skip: numberOfItems * (pageNumber - 1), limit: numberOfItems },
    (error, data) => {
      if (error) {
        return next(error);
      }
      res.json(data);
    },
  );
});

router.route('/users/show_messages').post((userId, req,res, next) => {
  // [TODO] Get user id from session for validation
  // const userID = '123';
  if (Object.keys(req.body).length === 0) {
    const error = 'Data not present in POST request body';
    return next(error);
  }
  const senderId = mongoose.Types.ObjectId(req.body.senderId);
  const { pageNumber } = req.body;
  const { numberOfItems } = req.body;
  // eslint-disable-next-line max-len
  // Formula to paginate : skip(NUMBER_OF_ITEMS * (PAGE_NUMBER - 1)).limit(NUMBER_OF_ITEMS )
  // Initial Value (Example) :  PAGE_NUMBER=1, NUMBER_OF_ITEMS=10
  Message.find(
    { senderId },
    null,
    { skip: numberOfItems * (pageNumber - 1), limit: numberOfItems },
    (error, response) => {
      if (error) {
        res.status(400);
        return next(error);
      }

      res.json(response);
    },
  );
});

// Creates a post for the user
router.route('/users/create_post').post((userId, req,res, next) => {
  // [TODO] Get user id from session for validation
  // const userID = '';

  const { body } = req;
  if (Object.keys(body).length === 0) {
    res.status(400).send('Post data not present');
    return next('Post data not present');
  }
  const { post } = body;
  post.senderId = mongoose.Types.ObjectId(post.senderId);

  // body.post has senderId field which is the _id of the user object
  Post.create(post, (error, data) => {
    if (error) {
      res.status(400).send('ValidationError');
      console.log(error);
      return next(error);
    }
    console.log(data);
    res.status(200).json(data);
  });
});

// /users/user_posts
router.route('/users/user_posts').post((userId, req,res, next) => {
  // [TODO] Get user id from session for validation
  // const userID = '123';

  if (Object.keys(req.body).length === 0) {
    res.status(400).send('Post data not present');
    return next('Post data not present');
  }

  // senderId is the _id of the user object
  const senderId = mongoose.Types.ObjectId(req.body.post.senderId);
  const { pageNumber } = req.body.post;
  const { numberOfItems } = req.body.post;
  Post.find(
    { senderId },
    null,
    { skip: numberOfItems * (pageNumber - 1), limit: numberOfItems },
    (error, data) => {
      if (error) {
        console.log(`Error ${error}`);
        res.status(400).send(error);
        return next(error);
      }

      res.status(200).json(data);
    },
  );
});

// /posts/:post_id/delete
router.route('/posts/:post_id/delete').delete((userId, req,res, next) => {
  Post.findOneAndDelete({ _id: req.params.post_id }, (error, data) => {
    if (error) {
      return next(error);
    }
    res.status(200).json({
      msg: data,
    });
  });
});

// Return the list of friends of a user
router.route('/users/add_friend').post((userId, req,res, next) => {
  // [TODO] : get session and validate
  // const userID = '123';
  if (Object.keys(req.body).length === 0) {
    res.status(400).send('Post data not present');
    return next('Post data not present');
  }

  const { data, userID } = req.body;
  // Get userID from the _id field of the request.

  UserConnection.update(
    { userId: userID },
    {
      $set: data,
    },
    { upsert: true },
    // eslint-disable-next-line consistent-return
    (error, response) => {
      if (error) {
        console.log(`Error ${error}`);
        return next(error);
      }
      res.status(200).json(response);
    },
  );
});

module.exports = router;
