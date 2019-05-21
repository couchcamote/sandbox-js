const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.send("users Index");
});

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed registraion'});
        }else{
            res.json({success: true, msg: 'Registration Success'});
        }
    });

});

router.get('/autheticate', (req, res, next) => {
    res.send("Authenticate User");
});


router.get('/profile', (req, res, next) => {
    res.send("View  User Profile");
});

module.exports = router;

