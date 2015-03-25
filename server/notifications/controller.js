var db           = require('../db/db.js');
var User         = global.db.User;
var Item         = global.db.Item;
var Message      = global.db.Message;
var Notification = global.db.Notification;
var controller   = {};

// err handler
var handleError = function(err, res) {
  res.status(500);
  res.send(err);
}

// creates a notification
controller.create = function(req, res, next){
  var itemId = req.params.itemId;
  var borrowerId = req.params.borrowerId;

  Notification.create({
    itemreq_id: itemId,
    userreq_id: borrowerId
  }).then(function(notification){
    res.send(notification);
  }).catch(function(err) {
    console.log('\nERROR WRITING NOTIFICATION:\n', err);
    handleError(err, res);
  });
};

// gets borrower in and item information related to notifications owned by user
controller.getByUser = function(req, res, next){
  var userId = req.params.userId;

  Item.findAll({
    where: { lender_id: userId },
    include: [{ 
      model: User,
      required: true
    }]
  }).catch(function(err) {
    console.log('\nNotification getByUser error:', err);
    handleError(err, res);
  }).then(function(items) {
    res.json(items);
  })
};


// accepts the request, makes the beebucks transaction
controller.acceptRequest = function(req, res, next){//This should delete all notifications related to the item
  var borrowerId = req.params.borrower;
  var cost = 0;
  var bank = 0;
  var lender;
  Item.find({
    where: {
      id: req.params.item
    }
  }).then(function(item){
    lender = item.lender_id;
    cost = item.beebucks;
    User.find({
      where: {
        id: borrowerId
      }
    }).then(function(user){
      bank = user.beebucks;
      if(user.beebucks >= cost){
        Notification.destroy({
            where: {
              itemreq_id: req.params.item
            }
          }).then(function(){
            Item.update(
              {borrowed: true, borrower_id: req.params.borrower},
              {where: {id: req.params.item}}
            )
          }).then(function(){
            var borrowerBucks = bank - cost;
              User.update(
                {beebucks: borrowerBucks},
                {where: {id: req.params.borrower}}
              )
          }).then(function(){
            User.find({
              where: {
                id: lender
              }
            }).then(function(user){
              var bank = user.beebucks;
              var lenderBucks = bank + cost;
              User.update(
              {beebucks: lenderBucks},
              {where: {id: user.id}}
              )
            }).then(function(){
              res.send('This item has been updated and borrowed ');
            })
          })
      }
      else{
        res.send('This item cannot be bought');
      }
    })
  })
}

// reject the request from a single user
controller.rejectRequest = function(req, res, next){
  Notification.destroy({
    where: {
      itemreq_id: req.params.item,
      userreq_id: req.params.borrower
    }
  }).then(function(){
    res.send('a particular users request for an item has been removed from the notificiations')
  })
}
 
module.exports = controller;
