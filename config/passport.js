const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const appconfig = require('../config/appconfig');

module.exports = function(passport) {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = appconfig.security.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        console.log(jwt_payload);

        console.log(JSON.stringify(jwt_payload));

        User.getUserById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });

    }));

}