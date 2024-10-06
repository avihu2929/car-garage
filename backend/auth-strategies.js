const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Bcrypt = require('bcrypt');
const User = require('./models/User'); 
// Define local strategy for authentication (username/password)
passport.use(new LocalStrategy({
  usernameField: 'phone',
}, async (phone, password, done) => {
  try {
    const user = await User.findOne({ phone });
    if (!user) return done(null, false);
    const isValidPassword = await Bcrypt.compare(password, user.password);
    if (!isValidPassword) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// // Define JWT strategy for authentication
// passport.use(new JwtStrategy({
//   jwtFromRequest: req => req.headers['x-access-token'],
// }, async (token, done) => {
//   try {
//     const decoded = await verify(token);
//     return done(null, decoded);
//   } catch (error) {
//     return done(error);
//   }
// }));
