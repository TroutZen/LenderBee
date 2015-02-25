var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var users = require('./users/controller.js');
var items = require('./items/controller.js');
// var notifications = require('./notifications/controller.js');
var messages = require('./messages/controller.js');
var notifications= require('./notifications/controller.js');
var reviews = require('./reviews/controller.js');

module.exports = function(app, express){
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(logger('dev'));
	app.use(express.static(path.join(__dirname, '../client')));

	//route for the homepage
	app.get('/', function(req, res){
		res.render('../client/index.html')
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
};