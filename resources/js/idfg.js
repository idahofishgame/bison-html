/*
 * JavaScript for Idaho Fish and Game Main Menu and Accounts Links
 */
$(document).ready(function () {
  loadMainMenu();
});

function loadMainMenu () {
  $.ajax({
    cache: false
    , crossDomain: true
    , dataType: 'jsonp'
    , jsonpCallback: 'jQuery11120031282627722248435_1439335233466'
    , success: function loadMenuFromJsonSuccessCallback (data, requestStatus) {
      if (requestStatus === 'success') {
        $('#block-idfg-components-menu').replaceWith(data).promise().done(function() {
          updateLoginInfo();
        });
      } else {
        updateLoginInfo();
      }
    }
    , type: 'GET'
    , url: 'https://fishandgame.idaho.gov/ifwis/rest/services/web/site/menu/1.jsonp'
  });
}

function updateLoginInfo () {
  $('.accounts-login-link a').attr('href', $(this).attr('href') + '?returnurl=' + window.location.href);
  $.getJSON('https://idfg.idaho.gov/accounts/user/state?callback=?', null, function(data) {
    if (data.user !== null) {
      $('.accounts-login-link a .link-text').text(data.user);
    } else {
      $('.accounts-login-link a .link-text').text("Login");
    }
  });
}
