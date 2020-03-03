const User = require('../models/user.js');


// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "request content can not be empty"
        });
    }

    User.create(req.body, (error, data) => {
        if (error) {
            console.log(error)
          return next(error)
        } else {
          console.log(data)
          res.json(data)
        }
    });


    // Create a new user
    const note = new User({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};