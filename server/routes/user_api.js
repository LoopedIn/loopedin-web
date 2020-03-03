let express = require('express');
let router = express.Router();

let { User}  = require('../models/user.js');

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
  
router.route('/users/:id/delete');
