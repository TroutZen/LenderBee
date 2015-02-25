var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var users = require('./users/controller.js');
var items = require('./items/controller.js');
// var notifications = require('./notifications/controller.js');
var messages = require('./messages/controller.js');
var notifications= require('./notifications/controller.js');
var reviews = require('./reviews/controller.js');

/* Facebook Auth */
var FacebookStrategy = require('passport-facebook').Strategy;
var session					 = require('session');
var cookieParser		 = require('cookie-parser');
var methodOverride 	 = require('method-override');
var fb 							 = require('./ApiKeysFB.js');





module.exports = function(app, express){

	/*========================================
	=            Mount Middleware            =
	========================================*/

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(methodOverride()); // [Note] might not need this middleware, using per passport demo
	app.use(session({ secret: 'neitherBorrowerNorLenderBe' }))
	
	/* Initialize Passport */
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(path.join(__dirname, '../client')));



	/*=====================================================
	=            Passport/Facebook Integration            =
	=====================================================*/
	passport.use(new FacebookStrategy({
			clientID: fb.FACEBOOK_APP_ID,
			clientSecret: FACEBOOK_APP_SECRET,
			callbackURL: "http://localhost:3000/auth/facebook/callback"
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function(){
				// you would want
	      // to associate the Facebook account with a user record in your database,
	      // and return that user instead.
				
				// [Note] This might need to be adjusted for our app
				return done(null, profile);      	
			});
		}
	));

	passport.serializeUser(function(user, done) {
	  // [Note] Dunno what needs to go here
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		// [Note] Dunno what needs to go here
	  done(null, obj);
	});

	

	/*==============================
	=            Routes            =
	==============================*/
		
	/* Static Routes */
	app.get('/', ensureAuthenticated, function(req, res){
		// [Warning] Don't we want this to point to the dist folder? (for deployment)
		// TODO: somehow we need to be able to send back the user data and note that it is attached to the request object
		res.render('../client/index.html', {user: req.user});
	});

	app.get('/login', function(req, res){
		// TODO: we want this to render an html with react components for logging in
		res.render('../client/static/login/index.html');
	});

	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
		function(req, res){
			/* redirect to root route if they are logged in */
			res.redirect('/');
		});

	// [Note] Not sure how we will handle logging out yet...don't want a seperate static file
	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});



	//API routes for users (can amend as we decide what we need)
	app.post('/api/users/signup', users.create); //WORKS
	app.get('/api/users/:user', users.getOne); //WORKS - returns all info on a single user, regardless of borrower/lender. --takes in a user_id. not username

	//API routes for reviews
	app.post('/api/reviews/:user', reviews.create);
	app.get('/api/reviews/user/:user', reviews.getReviews);
	app.post('/api/reviews/users/:lender_id/:borrower_id', reviews.createPending); // [Note] Creates two reviews without rating/content for lender/borrower

	//API routes for items (can amend as we decide what we need)
	app.post('/api/items/:user', items.create); //WORKS
	app.get('/api/items/city/:user/:title', items.searchItemByCity);
	app.get('/api/items/user/:user', items.getOneByUser); 

	//API routes for messages (can amend as we decide what we need)
	app.post('/api/messages/:from/:to', messages.create); //WORKS
	app.get('/api/messages/:user', messages.getMessages); //WORKS

	//API routes for notifications (can amend as we decide what we need)
  //very serious mismatch between what i'm writing and what may be expected on front-end
	app.post('/api/notifications/:item/:borrower', notifications.create);
	app.get('/api/notifications/:user', notifications.getByUser);
	// app.get('/api/notifications/:user', notifications.getOneByUser);
	 //WORKS - create notifications when borrower requests item
  // app.get('/api/notifications/:user/:item', notifications.getByUser);

  /*-----  End of Routes  ------*/

  function ensureAuthenticated(req, res, next) {
  	if(req.isAuthenticated()) {return next();}
  	res.redirect('/login');
  }
};