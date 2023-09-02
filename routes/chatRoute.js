const path = require('path')
const express = require('express');
const router = express.Router();   

router.get('/', (req, res, next) =>{
     console.log("mascascev",JSON.parse(req.query.data));
     // window.localStorage.setItem('userdata',JSON.parse(req.query.data));
     res.cookie("userName",JSON.parse(req.query.data).name);
     res.cookie("userToken",JSON.parse(req.query.data).token);
     res.cookie("userPriviledge",JSON.parse(req.query.data).priveledge);
     // res.cookie("us")
     res.sendFile(path.join(__dirname, '../', 'index.html'));
})

module.exports = router;