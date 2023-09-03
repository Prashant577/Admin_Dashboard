const User = require("../models/userModel");

exports.getUsers = (req, res, next) => {

    User.find()
    .then((users) => {
        // res.status(200).json({
        //   message: "Users fetched successfully",
        //   posts: users,
        // });
        res.render("userDetails",{
          title: 'User Details',
          users:users
        })
      })
    .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;
  const user = new User({
    name: name,
    email: email,
    password: password,
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      // res.status(201).json({
      //   message: "User Created Successfully",
        
      // });
      res.redirect('/');
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getSingleUser =  (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.redirect('/')
      }
      res.render("edit_users",{
        title: 'Edit User',
        user: user
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updateData = {
    name: req.body.name,
    email: req.body.email,
  };

  User.findByIdAndUpdate(userId, updateData)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.redirect('/');
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndRemove(userId)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.redirect('/');
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

