const express = require("express");

const usercontroller = require('../controllers/userController');

const router = express.Router();

//GET /feed/posts
router.get("/getusers", usercontroller.getPosts);

//POST /feed/post
router.post("/createuser", usercontroller.createPost

);
//UPDATE SINGLE POST
router.put("/user/:userId", usercontroller.updatePost);


//DELETE SINGLE POST
router.delete('/user/:userId', usercontroller.deletePost)

module.exports = router;
