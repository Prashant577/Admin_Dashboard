const path = require('path');
const express = require('express');
const router = express.Router(); 

router.get('/registerForm',(req,res,next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'registrationForm.html'))
})
module.exports = router;