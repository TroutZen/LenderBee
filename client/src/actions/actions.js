var Reflux = require('reflux');

var actions = Reflux.createActions([
  "nextCarousel",
  "prevCarousel",
  "clickProfilePic", 
  "requestLentPage",
  "requestBorrowedPage",
  "toggleSideNav",
  "searchSubmit",
  "selectItem",
  "searchResComplete",
  "lenderMessaged",
  "borrowedItemReturned",
  "itemRequestSubmitted",
  "messageFormSubmitted",
  "loginToggle",
  "mapMounted",
  "fetchConversations",
  "randomItems",
  "initializeUser",
  "authenticateUser",
  "conversationCalled",
  "itemRequestAccepted",
  "itemRequestDeclined",
  "getNotifications",
  "postFormSubmitted",
  "mountUser",

  /* Items API */
  "fetchItems",
  "returnItem",

  /* Notifications API */
  "acceptRequestToBorrow",
  "declineRequestToBorrow",
  "fetchNotifications",

  /* Reviews API */
  "fetchPendingReviews",
  "fetchReviews",
  "reviewFormSubmitted"
]);

module.exports = actions;
