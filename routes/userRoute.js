const express = require("express");

const usercontroller = require('../controllers/userController');

const router = express.Router();

//GET /user/getusers
router.get("/getusers", usercontroller.getUsers);

//POST /user/createuser
router.post("/createuser", usercontroller.createUser);

//GET SINGLE USER /user/edit/:userId
router.get("/edit/:userId",usercontroller.getSingleUser);

//UPDATE SINGLE USER /user/update/:userId
router.post("/update/:userId", usercontroller.updateUser);


//DELETE SINGLE USER
router.get('/delete/:userId', usercontroller.deleteUser)

module.exports = router;
