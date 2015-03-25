$(function() {
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      $.ajax({
        type: "get",
        url: "/api/users/test",
        data: response,
        dataType: 'json',
        success: function(response){
          if(response==="outside"){
            $(".loginButton").hide();
            $(".signup").show();
          }else{
            document.location.href = "/";
          }
        }
      });
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : 1568513570056402,
    cookie     : true,  // enable cookies to allow the server to access 
    session    :true,   // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });
  FB.Event.subscribe('auth.login', function(resp) {
    $.ajax({
      type: "get",
      url: "/api/users/test",
      data: resp,
      dataType: 'json',
      success: function(resp){
        if(resp==="outside"){
          $(".loginButton").hide();
          $(".signup").show();
        }else{
          document.location.href = "/";
        }
      }
    });
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.
    $('.fb-login-button').on('click', function() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  function testAPI() {
    FB.api('/me', function(response) {
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  $("#submit").on("click", function(){
    var locInfo = {};
    locInfo.address = $("#address").val();
    locInfo.city = $("#city").val();
    locInfo.state = $("#state").val();
    locInfo.country = $("#country").val();
    locInfo.zip = $("#zip").val();
    $.ajax({
      type: "POST",
      url: "/api/users/loc",
      data: locInfo,
      dataType: 'json',
      success: function(){
        window.location = '/';
      }
    });
  });

  $(".signup").hide();
});