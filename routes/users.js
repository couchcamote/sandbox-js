const express = require('express');
const router = express.Router();
const User = require('../models/user');
const appconfig = require('../config/appconfig');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/', (req, res) => {
    res.send("users Index");
});

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed registraion'});
        }else{
            res.json({success: true, msg: 'Registration Success'});
        }
    });

});

router.post('/authenticate', (req, res, next) => {
   // res.send("Authenticate User");

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;



    User.getUserByUserName(username, (err, user) => {
        if(err) throw err;
        
        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, match) => {
            if(err) throw err;
            if(match){
                const token = jwt.sign(user.toJSON(), appconfig.security.secret, {
                    expiresIn: appconfig.security.tokenexpiration
                });

                res.json({
                    success: true,
                    token: 'JWT '+ token,
                    user :{
                        id :user._id,
                        name : user.name,
                        username : user.username,
                        email : user.email
                    }
                });
            }else{
                res.json({
                    success: false,
                    msg: 'Incorrect password'
                });
            }
        });

    }
);


});


router.get('/profile', passport.authenticate('jwt', {session: false}),(req, res, next) => {
//    res.send("View  User Profile");
    res.json({user : req.user});
});

module.exports = router;

