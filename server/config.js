var bodyParser       = require('body-parser');
var logger           = require('morgan');
var path             = require('path');
var users            = require('./users/controller.js');
var items            = require('./items/controller.js');
var messages         = require('./messages/controller.js');
var notifications    = require('./notifications/controller.js');
var reviews          = require('./reviews/controller.js');
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session          = require('express-session');
var cookieParser     = require('cookie-parser');
var methodOverride   = require('method-override');
var fb               = require('./.ApiKeysFB.js');

module.exports = function(app, express){

  // middleware
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(session({ secret: 'neitherBorrowerNorLenderBe' }))
  app.use(passport.initialize());
  app.use(passport.session());

  // static files to serve
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // passport facebook auth
  passport.use(new FacebookStrategy({
      clientID: fb.FACEBOOK_APP_ID,
      clientSecret: fb.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
        return done(null, profile);       
      });
    }
  ));

  // login route
  app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/login.html'));
  });

  dFile(path.join(__dirname, '../client/login/index.html'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res){
      res.redirect('/');
    });

  app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res){
  });

  function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {return next();}
    res.redirect('/login');
  };

  
  // user endpoints
  app.post('/api/users/signup', function(req, res){
    req.body.loc = req.session.loc;
    users.create(req, res);
  }); 
  app.get('/api/users/test', users.testUser);
  app.get('/api/users/init/:userID', users.init);
  app.get('/api/users/:userId', users.getOne);
  app.post('/api/users/loc', function(req, res){
    req.session.loc = req.body;
    res.status(200).end();
  });

  // reviews endpoints
  app.get('/api/reviews/user/:userId', reviews.getReviews);
  app.put('/api/reviews/:reviewId/update', reviews.updateOne);
  app.post('/api/reviews/users/:lender_id/:borrower_id/:item_id', reviews.createPending); // [Note] Creates two reviews without rating/content for lender/borrower
  app.get('/api/reviews/:userId', reviews.getPendingReviews);

  // item endpoints
  app.post('/api/items/:userId', items.create); //WORKS
  app.get('/api/items/city/:userId/:title', items.searchItemByCity); //WORKS
  app.get('/api/items/allcity/:userId', items.getItemByCity);
  app.put('/api/items/return/:itemsId', items.returnItem); //WORKS --itemsId is the id of the item being returned
  app.get('/api/items/user/:userId', items.getOneByUser);
    
  // messages endpoints
  app.post('/api/messages/:fromId/:toId', messages.create); //WORKS
  app.get('/api/messages/:userId', messages.getMessages); //WORKS

  // notifications endpoints
  app.post('/api/notifications/:itemId/:borrowerId', notifications.create);
  app.get('/api/notifications/:userId', notifications.getByUser);
  app.delete('/api/notifications/accept/:item/:borrower', notifications.acceptRequest); //--> delete all notifications for an item
  app.delete('/api/notifications/reject/:item/:borrower', notifications.rejectRequest);    //-->delete a notification for an item for a specific borrower
};