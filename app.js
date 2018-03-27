var express = require("express");
var app=express();
var bodyParser=require('body-parser');
var mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.json()); 
Tourist=require('./models/tourist');
//connect to Mongoose
var uri='mongodb://admin:admin@ds123499.mlab.com:23499/tourhubdb';
mongoose.connect(uri,{ useMongoClient: true });
var db=mongoose.connection;
//db.open('localhost/tourhubdb',{useMongoClient: true});
require('./models/passport')(passport);
app.get('/',function(req, res){ 
    res.send("plz use /api/tourist");
});
app.get('/api/tourist',function(req, res ){
    
     Tourist.getTourist(function(err,tourist){
         if(err)
         {
             throw err;
         }
         console.log("pp");
         res.json(tourist);
     });
    
});

app.get('/api/tourist/:_id',function(req, res ){
    Tourist.getTouristById(req.param._id,function(err,tourist){
        if(err)
        {
            throw err;
        }
        console.log("pp");
        res.json(tourist);
    });
   
});

app.post('/api/tourist',function(req, res ){
    var tourist=req.body;
    Tourist.addTourist(tourist,function(err,tourist){
        if(err)
        {
            throw err;
        }
        console.log("pp");
        res.json(tourist);
    });
   
});

app.put('/api/tourist/:_id',function(req, res ){
    var id=req.param._id;
    var tourist=req.body;
    Tourist.updateTourist(id,tourist,{},function(err,tourist){
        if(err)
        {
            throw err;
        }
        console.log("alert update");
        res.json(tourist);
    });
   
});

    app.get('/', function(req, res){
        res.json('Welcome to Node.js Authentication App. Please login/register .');
    });
    app.get('/login', function(req, res){
        res.json({message: ('loginMessage')});
    });
   /* app.post('/login', passport.authenticate('login',{
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));
    app.get('/register', function(req, res){
        res.json({message: req.flash('registerMessage')});
    });*/
    app.post("/login",
 function(req,res,next){
   passport.authenticate('login', function(err, user, info){
    //console.log (res.json( user))   
    res.json( user);
})(req,res,next); 
});
app.use(passport.initialize());
app.use(passport.session());

app.post("/register",
 function(req,res,next){
   passport.authenticate('register', function(err, user, info){
    res.json( user);      
  })(req,res,next); 
});
    /*app.post('/register', passport.authenticate('register',{
        successRedirect : '/profile',
        failureRedirect : '/register',
        failureFlash : true
    }));*/
    app.get('/profile', isLoggedIn, function(req,res){
        res.json({user : req.user});
    });
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
    });
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated())
        return next();
        res.redirect('/');
      };

app.delete('/api/tourist/:_id',function(req, res ){
    var id=req.param._id;
    Tourist.deleteTourist(id,function(err,tourist){
        if(err)
        {
            throw err;
        }
        console.log("alert deleted");
        res.json(tourist);
    });
   
});
app.listen(3000);
console.log('runing on port 3000...');