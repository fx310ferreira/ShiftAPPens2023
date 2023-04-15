const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { UserModel, IMTModel } = require('./database/UserModel')
const passport = require('passport')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSWORD;

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	IMTModel.findOne({id: jwt_payload.id}).then(user => {
		console.log(jwt_payload);
		return user ? done(null, user) : done(null, false);
	});
}));