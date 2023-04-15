const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { UserModel } = require('./database/UserModel')
const passport = require('passport')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSWORD;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	UserModel.findOne({id: jwt_payload.id}, function(err, user) {
		if (err) return done(err, false);
		return user ? done(null, user) : done(null, false);
	});
}));