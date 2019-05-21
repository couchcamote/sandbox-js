const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required : true
    },
    username: {
        type: String,
        required : String
    },
    password : {
        type : String,
        required : true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    console.log("Get User by ID");
    User.findById(id, callback);
}

module.exports.getUserByUserName = (username, callback ) => { 
    const query = { username : username};
    User.findOne(query, callback);
}

module.exports.getUserByEmail =  (email, callback ) => {
    const query = { email : email};
    User.findOne(query, callback);
}

module.exports.comparePassword = (formPassword, hashedPassword, callback ) => {
    bcrypt.compare(formPassword, hashedPassword, (err, matched) => {
        if(err) throw err;
        callback(null, matched);
    });
}

module.exports.addUser = (newUser, callback) => {
    const plainTextPassword = newUser.password;
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(plainTextPassword, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}