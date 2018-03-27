const LocalStrategy = require('passport-local').Strategy;

const User = require ('./tourist');
module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('register',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback:true
    },
    function(req,username, password, done) {
      console.log(username);
        User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (user) {
            return done(null, false, req.flash('registerMessage','Email is already taken...' ));
        }else{
            var newUser = new User();
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
            newUser.save(function(err){
            if(err) throw err;
            return done(null,true,newUser);
        });
        }
        });
}));

  passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback:true
    },
    function(req,username, password, done) {
      User.findOne({username: username }, function(err, user) {
        console.log(user,'usereserserers');
        if (err) { return done(err); }
        if (!user) {
          console.log('no user ')
          return done(null, false, { message : 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          console.log('kjhkjhk')
          //console.log(done)
          return done(null, false, { message : 'Incorrect password!' });
        }
        //console.log (   'jhjhgjhgjh');
        return   done (null,true,user) ;
      });
    }
  ));
};