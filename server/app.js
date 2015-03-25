var express      = require('express');
var app          = express();
var router       = require('./config.js');
var logger       = require('morgan');
var Sequelize    = require('sequelize');
var db           = require('./db/db.js');
var User         = global.db.User;
var Item         = global.db.Item;
var Message      = global.db.Message;
var Notification = global.db.Notification;
var Review       = global.db.Review;
var http         = require('http').Server(app);
var io           = require('socket.io').listen(http);

var port = process.env.PORT || 8080;

require('./config.js')(app, express);

io.on('connection', function(socket){
  socket.on('userInfo', function(msg){
     io.emit("userLoad", msg);
   });
});

http.listen(port, function(){
  console.log('Server listening on port:', port);
});
