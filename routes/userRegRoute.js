const path = require('path');
const express = require('express');
const router = express.Router(); 

router.get('/userreg',(req,res,next) =>{
    res.sendFile(path.join(__dirname, '../', 'views', 'userRegister.html'))
  })
module.exports = router;