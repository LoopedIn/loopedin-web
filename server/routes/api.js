const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const serverAuth = require('../auth_modules/server_auth.js');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const {sendMessageToClient}  = require("../lib/server.js")

console.log("hrer "+sendMessageToClient)



const { Post, Message } = require('../models/post.js');

const { User } = require('../models/user.js');

const { Loop, UserConnection } = require('../models/loop.js');

router.use(cors());
router.use(cookieParser());

router.route('/').get((req, res) => {
  res.send('Works');
});

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
        res.send(error);
      } else {
        res.status(400);
        res.send(error);
      }
      return next(error);
    }
    res.json(data);
  });
});
//Registering authenticated middleware
router.use(serverAuth.firebaseTokenAuthenticator);

router.route('/users/logged_in_user_info').post((req, res, next) => {
  res.json(req.body.user).send();
  next();
});

// Return the list of friends of a user
router.route('/users/add_friend').post(async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send('Post data not present');
    return next('Post data not present');
  }

  const data = req.body;
  const userId = req.body.userID;
  // data.userId = userId;
  // Get userID from the _id field of the request.
  const newFriendUsername = data.friendIds[0];
  const usersWithNewFriendUsername = await User.find({
    userName: newFriendUsername,
  }).exec();
  if (usersWithNewFriendUsername.length === 0) {
    // console.log("No user found with name " + newUsername)
    res.status(400).send('User does not exist');
  } else {
    const records = await UserConnection.find({ userId: userId }).populate({
      path: 'friendIds',
      select: ['firstName', 'lastName', '_id', 'userName'],
    });
    const currentFriendIds =
      records.length > 0 ? records[0].friendIds.map((obj) => obj._id) : [];
    const currentFriendNames =
      records.length > 0 ? records[0].friendIds.map((obj) => obj.userName) : [];
    if (currentFriendNames.includes(newFriendUsername)) {
      res.status(400).send('User is already a friend');
    } else {
      const friend = usersWithNewFriendUsername[0];
      UserConnection.updateOne(
        { userId: userId },
        {
          $set: { friendIds: [...currentFriendIds, friend._id] },
        },
        { upsert: true },
        async (error) => {
          if (error) {
            // console.log(`Error ${error}`);
            res.status(400).send(error);
            return next(error);
          }

          const records = await UserConnection.find({
            userId: friend._id,
          }).populate({
            path: 'friendIds',
            select: ['firstName', 'lastName', '_id', 'userName'],
          });
          const friendsFriendsIds =
            records.length > 0
              ? records[0].friendIds.map((obj) => obj._id)
              : [];
          await UserConnection.updateOne(
            { userId: friend._id },
            {
              $set: { friendIds: [...friendsFriendsIds, userId] },
            },
            { upsert: true },
            (error, response) => {
              if (error) {
                // console.log(`Error ${error}`);
                res.status(400).send(error);
                return next(error);
              }
              res.status(200).send(response);
            },
          );
        },
      );
    }
  }
});

router.route('/update-post/:id').post((req, res, next) => {
  // [TODO] Get user id from session
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
      // // console.log('Post updated successfully !')
    },
  );
});

router.route('/delete-post/:id').delete((req, res, next) => {
  // [TODO] Get user id from session
  Post.findOneAndDelete({ postId: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    }
    res.status(200).json({
      msg: data,
    });
  });
});

router.route('/post/updatepost').post((req, res, next) => {
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
      // // console.log('User updated successfully !');
    },
  );
});

// Create a loop for a user
router
  .route('/users/create_loop')
  .post(
    createValidationFor('loop'),
    checkValidationResult,
    (req, res, next) => {
      const { body } = req;
      // [TODO] : get user id from session for validation

      if (Object.keys(body).length === 0) {
        const error = 'The loop object to create loop is not present';
        res.status(400).send(error);
        return next(error);
      }

      const loopObject = req.body;
      loopObject.userId = req.body.userID;

      Loop.create(loopObject, (error, data) => {
        if (error) {
          if (error.name === 'ValidationError') {
            res.status(400).send(error);
            return next(error);
            // res.send("ValidationError")
          }
          // console.log(error);
          res.status(400).send(error);
          return next(error);
        }
        // // console.log(data)
        res.status(200).send(data);
      });
    },
  );

// Get the loops the user has created
router.route('/loops').post((req, res, next) => {
  // [TODO] get user id from session for validation
  // userID is the _id object of the user
  let { userID } = req.body;
  userID = mongoose.Types.ObjectId(userID);
  Loop.find({ userId: userID }, (error, data) => {
    if (error) {
      res.status(400).send(error);
      return next(error);
    }

    // console.log(data);
    res.json(data);
  });
});

// update loop of a user
router.route('/loops/:loop_id/update_loop').post((req, res, next) => {
  // [TODO] Get user id from session
  // const userID = '';
  const { body } = req;
  if (Object.keys(body).length === 0) {
    const error = 'Data not present in POST request body';
    res.status(400).send(error);
    return next(error);
  }

  let loopID = req.params.loop_id;
  const userID = req.body.userID;
  const { contacts, loopName } = req.body.loop;
  loopID = mongoose.Types.ObjectId(loopID);
  // Update the members of the loop of a user
  Loop.updateOne(
    { _id: loopID, userId: userID },
    { $set: { receivingUsers: contacts, loopName: loopName } },
    (error, response) => {
      if (error) {
        res.status(400).send(error);
        return next(error);
      }
      res.status(200).send(response);
    },
  );
});

// Return the members of a loop for a user
router.route('/loops/:loop_id/get_contacts').post((req, res, next) => {
  let { loop_id } = req.params;
  // [TODO] Get user id from session for validation
  // const userID = '';
  loop_id = mongoose.Types.ObjectId(loop_id);
  Loop.find({ _id: loop_id }, { receivingUsers: 1 }, (error, response) => {
    if (error) {
      res.status(400).send(error);
      return next(error);
    }

    // console.log("SERVER "+response)
    res.status(200).send(response);
  });
});

// // Stores a message send from one user to another
// router.route('/users/send_message').post((req, res, next) => {
//   // [TODO] Get user id from session
//   // const userID = '';
//   const { MessageObject } = req.body;
//   MessageObject.senderId = mongoose.Types.ObjectId(MessageObject.senderId);
//   Message.create(MessageObject, (error, data) => {
//     if (error) {
//       // console.log(error);
//       res.status(400).send(error);
//       return next(error);
//     }
//     // console.log(data);
//     res.json(data);
//   });
// });

router.route('/users/getcontacts').post((req, res, next) => {
  const userid = req.body.userID;
  UserConnection.find({ userId: userid }, { friendIds: 1 })
    .populate({
      path: 'friendIds',
      select: ['firstName', 'lastName', '_id', 'userName'],
    })
    .exec((err, data) => {
      if (err) {
        res.status(400).send(err);
        return next(err);
      }
      // console.log("SERVER "+data)
      res.status(200).send(data);
    });
});

// // Get list of messages between two persons
// router.route('/users/show_messages_persons').post((req, res, next) => {
//   // [TODO] Get user id from session for validation
//   // const userID = '';
//   if (Object.keys(req.body).length === 0) {
//     const error = 'Data not present in POST request body';
//     res.status(400).send(error);
//     return next(error);
//   }
//   const senderId = mongoose.Types.ObjectId(req.body.senderId);
//   const receivingUserId = mongoose.Types.ObjectId(req.body.receivingUserId);
//   const { pageNumber } = req.body;
//   const { numberOfItems } = req.body;
//   // eslint-disable-next-line max-len
//   // Formula to paginate : 
//  skip(NUMBER_OF_ITEMS * (PAGE_NUMBER - 1)).limit(NUMBER_OF_ITEMS )
//   // Initial Value (Example) :  
// PAGE_NUMBER=1, NUMBER_OF_ITEMS=10
//   Message.find(
//     { senderId, receivingUserId },
//     null,
//     { skip: numberOfItems * (pageNumber - 1), limit: numberOfItems },
//     (error, data) => {
//       if (error) {
//         res.status(400).send(error);
//         return next(error);
//       }
//       res.json(data);
//     },
//   );
// });

// router.route('/users/show_messages').post((req, res, next) => {
//   // [TODO] Get user id from session for validation
//   // const userID = '123';
//   if (Object.keys(req.body).length === 0) {
//     const error = 'Data not present in POST request body';
//     return next(error);
//   }
//   const senderId = mongoose.Types.ObjectId(req.body.senderId);
//   const { pageNumber } = req.body;
//   const { numberOfItems } = req.body;

//   // Formula to paginate :
//   // skip(NUMBER_OF_ITEMS * (PAGE_NUMBER - 1)).limit(NUMBER_OF_ITEMS )
//   // Initial Value (Example) :  PAGE_NUMBER=1, NUMBER_OF_ITEMS=10
//   Message.find(
//     { senderId },
//     null,
//     { skip: numberOfItems * (pageNumber - 1), limit: numberOfItems },
//     (error, response) => {
//       if (error) {
//         res.status(400).send(error);
//         return next(error);
//       }

//       res.json(response);
//     },
//   );
// });
function checkValidationResult(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  res.status(400).send(result.array());
}
function createValidationFor(route) {
  switch (route) {
    case 'post':
      return [
        check('postContent', 'Post content cannot be empty')
          .trim()
          .isLength({ min: 1 })
          .escape(),
      ];
    case 'message':
      return [
        check('messageContent', 'Message content cannot be empty')
          .trim()
          .isLength({ min: 1 })
          .escape(),
      ];
    case 'loop':
      return [
        check('loopName', 'Loop name cannot be empty')
          .trim()
          .isLength({ min: 1 })
          .escape(),
      ];

    default:
      return [];
  }
}
// Creates a post for the user
router
  .route('/users/create_post')
  .post(
    createValidationFor('post'),
    checkValidationResult,
    (req, res, next) => {
      // [TODO] Get user id from session for validation
      // const userID = '';

      const { body } = req;
      if (Object.keys(body).length === 0) {
        res.status(400).send('Post data not present');
        return next('Post data not present');
      }

      req.body.senderId = mongoose.Types.ObjectId(req.body.userID);

      // body.post has senderId field which is the _id of the user object
      Post.create(req.body, (error, data) => {
        if (error) {
          res.status(400).send('ValidationError');
          // console.log(error);
          //res.status(400).send(error);
          console.log(error);
          return next(error);
        }
        // console.log(data);
        res.status(200).send(data);
      });
    },
  );

// /users/user_posts
router.route('/users/user_posts').post((req, res, next) => {
  validateBody(req);
  const userid = req.body.userID;
  Post.find({ senderId: userid }, (error, data) => {
    if (error) {
      console.log(`Error ${error}`);
      res.status(400).send(error);
      return next(error);
    }
    res.status(200).json(data);
  });
});

// /posts/:post_id/delete
router.route('/posts/:post_id/delete').delete((req, res, next) => {
  const userid = req.body.userID;
  Post.findOneAndDelete(
    { _id: req.params.post_id, senderId: userid },
    (error, data) => {
      if (error) {
        return next(error);
      }
      res.status(200).json({
        msg: data,
      });
    },
  );
});

router
  .route('/users/create_message')
  .post(
    createValidationFor('message'),
    checkValidationResult,
    (req, res, next) => {
      const { body } = req;
      if (Object.keys(body).length === 0) {
        res.status(400).send('Post data not present');
        return next('Post data not present');
      }
      // console.log (req.body)
      req.body.senderId = mongoose.Types.ObjectId(req.body.userID);
      const {sendMessageToClient}  = require("../lib/server.js")
      //const sendMessage=sendMessageToClient()
      sendMessageToClient(req.body.receivingUserId)
      // body.post has senderId field which is the _id of the user object
      Message.create(req.body, (error, data) => {
        if (error) {
          //res.status(400).send('ValidationError');
          // console.log(error);
          res.status(400).send(error);
          return next(error);
        }
        // console.log(data);
        sendMessageToClient(req.body.receivingUserId)
        res.status(200).json(data);

        
      });
    },
  );

function validateBody(req, res, next) {
  if (req.body.length === 0) {
    res.status(400).send('Post data not present');
    return next('Post data not present');
  }
  // console.log("Post body present")
  return;
}

//Get_recent_chats
router.route('/users/get_recent_chats').post(async (req, res, next) => {
  validateBody(req);

  const userID = req.body.userID; // TODO: change

  const records = await UserConnection.find(
    { userId: userID },
    { friendIds: 1 },
  );
  const currentFriends = records.length > 0 ? records[0].friendIds : [];
  var messages = [];

  for (const friendID of currentFriends) {
    let data = await Message.findOne({
      $or: [
        { $and: [{ receivingUserId: userID }, { senderId: friendID }] },
        { $and: [{ receivingUserId: friendID }, { senderId: userID }] },
      ],
    }).sort({ created: -1 });
    const friend = (await User.find({ _id: friendID }))[0];
    const resp = {
      _id: data ? data._id : '',
      receivingUserId: data ? data.receivingUserId : '',
      messageType: data ? data.messageType : '',
      messageContent: data ? data.messageContent : '',
      created: data ? data.created : '2020-04-12T04:20:48.738Z',
    };
    resp['sender'] = {
      _id: friend._id,
      userName: friend.userName,
      firstName: friend.firstName,
      lastName: friend.lastName,
    };
    //console.log(emptymessage);
    messages.push(resp);
  }
  //console.log(messages);
  var sortedMessages = messages.sort(function(a, b) {
    return new Date(b.created) - new Date(a.created);
  });
  //console.log(sortedMessages);
  res.send(sortedMessages);
  return next();
});

//get_chat_history
router.route('/users/get_chat_history').post((req, res, next) => {
  validateBody(req);
  // console.log( req.body.userID)
  const userID = req.body.userID; // TODO: change
  const friendID = req.body.friendID;
  // console.log("userid",userID)
  // console.log("friendID",friendID)
  Message.find()
    .or([
      { $and: [{ receivingUserId: userID }, { senderId: friendID }] },
      { $and: [{ receivingUserId: friendID }, { senderId: userID }] },
    ])
    .sort({ created: -1 })
    .populate({
      path: 'replyToPost',
      select: 'postContent -_id',
    })
    .exec((error, data) => {
      if (error) {
        //console.log(error);
        res.status(400);
        return next();
      }
      //console.log(data);
      res.json(data);
      return next();
    });
});

//get_recent_posts
function getLoopsContainingUser(userID) {
  //console.log(userID);
  return new Promise((resolve, reject) => {
    Loop.find({ receivingUsers: userID }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        //console.log('Loops: ' + data);
        resolve(data);
      }
    });
  });
}

router.route('/posts/get_recent_posts').post((req, res, next) => {
  validateBody(req);
  // console.log( req.body.userID)
  const userID = req.body.userID; // TODO: change
  getLoopsContainingUser(userID)
    .then((data) => {
      var loopIDS = [];

      data.forEach((loop) => {
        loopIDS.push(loop._id);
      });
      //console.log('LOOPSIDS ' + JSON.stringify(loopIDS));

      Post.find({
        $or: [
          { receivingUserIds: userID },
          { receivingLoopIds: { $in: loopIDS } },
        ],
      })
        .sort({ created: -1 })
        .exec((error, data) => {
          if (error) {
            // console.log(error);
            res.status(400).send(error);
            return next();
          }
          //console.log(data);
          var senderIds = [];
          // create an array of senderIds to query mongodb
          data.forEach((post) => {
            senderIds.push(mongoose.Types.ObjectId(post.senderId));
          });
          //console.log('SENDERIDS ' + senderIds);
          // eslint-disable-next-line max-len
          User.find({ _id: { $in: senderIds } }, (error, response) => {
            if (error) {
              res.status(400).send(error);
              return next();
            }
            //console.log('User details  ' + response);
            var finalPostsData = [];
            var resultObject = {};
            // form a map of the form : userId:{firstName,lastName}
            response.forEach((user) => {
              resultObject[user._id] = {};
              resultObject[user._id]['firstName'] = user.firstName;
              resultObject[user._id]['lastName'] = user.lastName;
            });
            // eslint-disable-next-line max-len
            // Iterate through posts data and create each final item of the form : firstName,
            // lastName,postContents, timestamp
            data.forEach((post) => {
              var postObject = {};
              postObject['postType'] = post.postType;
              postObject['postContent'] = post.postContent;
              postObject['created'] = post.created;
              postObject['postID'] = post._id;
              postObject['firstName'] =
                resultObject[post.senderId]['firstName'];
              postObject['lastName'] = resultObject[post.senderId]['lastName'];
              finalPostsData.push(postObject);
            });
            //console.log(finalPostsData);
            res.status(200).send({ posts: finalPostsData });
            return next();
          });
        });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});
module.exports = router;
