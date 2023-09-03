const User = require("../models/userModel");

exports.getPosts = (req, res, next) => {

    User.find()
    .then((users) => {
        res.status(200).json({
          message: "Users fetched successfully",
          posts: users,
        });
      })
    .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  
};

exports.createPost = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;
  const user = new User({
    name: name,
    email: email,
    password: password,
    city: city
  });
  user
    .save()
    .then((result) => {
      console.log(result);
      // res.status(201).json({
      //   message: "User Created Successfully",
        
      // });
      res.redirect('http://localhost:3000');
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;
  User.findById(userId)
    .then((user) => {
      user.name = name;
      user.email = email;
      user.password = password;
      user.city = city;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "User Updated", user: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      return User.findByIdAndRemove(userId);
    })
    .then((result) => {
      res.status(200).json({ message: "Post Deleted" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
