const {body ,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/adminModel');

exports.signUp = (req,res, next) => {
    console.log('the route is getting triggered');
    const errors = validationResult(req);
    if(!errors.isEmpty){
        const error = new Error('Validation Failed! Please Entered Data in Correctly');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;``
    bcrypt.hash(password, 10)
    .then(hashedPw => {
        const user = new Admin({
            email: email,
            password: hashedPw,
            name: name
        });
        return user.save();
    })
    .then(result => {
        // res.status(201).json({
        //     message:'New Admin Created',
        //     userId: result
        // })
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })

}

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedAdmin;
    console.log('user login data :::',Admin.findOne({email: email}));
    Admin.findOne({email: email}) 
    .then(user => {
        if(!user){
            const error = new Error('Admin Not Found');
            error.statusCode = 404;
            throw error;
        }
        loadedAdmin = user;
        console.log("loaded user :->", loadedAdmin);
        return bcrypt.compare(password, user.password);     
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('Wrong Password Entered');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedAdmin.email,
            userId: loadedAdmin._id.toString()
        },
         'authorizationSecretKey', 
         {expiresIn: '2h'}
        );
        console.log("token", token);
        res.status(200).json({
            name: loadedAdmin.name,
            token: token,
            userId: loadedAdmin._id.toString(),
            priveledge: loadedAdmin.priveledge
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}