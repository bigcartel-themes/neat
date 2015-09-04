// ------------------------------------------------------------------------------------------------
//
// This is where all of the JavaScript code is handled for your theme.
//
// We recommend you break your JavaScript into multiple files and put them in a separate
// directory. We've used a "javascripts" directory in our example below. After that we'll use
// Sprockets (getsprockets.org) to package them into one file. Sprockets also allows you to
// use CoffeeScript (coffeescript.org) by ending your file name with .coffee.
//
// However, if you don't have much JavaScript, or you're just a glutton for punishment,
// you could simply put all of your JavaScript in this file. It's up to you.
//
// ------------------------------------------------------------------------------------------------
//
// Here we're including a couple CoffeeScript files written for different areas of the store, we're
// also including jQuery in our layout.html from Google so that it can be better cached by users.
//
//= require_directory ./javascripts/vendor

function isIE() {
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent;
    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
  }
  else if (navigator.appName == 'Netscape') {
    var ua = navigator.userAgent;
    var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
  }
  return rv == -1 ? false : true;
}
$(document).ready(function () {
  
	$('.image_gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image </a> could not be loaded.',
		}
	});
  
  if ($('.featured').length) { 
    var waypoint = new Waypoint({
      element: $('.featured'),
      handler: function(direction) {
        var screenWidth = Waypoint.viewportWidth();
        if (screenWidth > 800) {
          if (direction === 'down') {
            $('.featured').animate({ opacity: 0 });
          }
          else {
            $('.featured').animate({ opacity: 1 });
          }
        }
      },
      offset: 120 
    });
  }
  if ($('.content').length) { 
    var waypoint = new Waypoint({
      element: $('.content'),
      handler: function(direction) {
        var screenWidth = Waypoint.viewportWidth();
        if ($('.slideshow').length && screenWidth > 800) {
          if (direction === 'down') {
            $('header').addClass('overlay');
          }
          else {
            $('header').removeClass('overlay');
          }
        }
      },
      offset: 88
    });
  }
  this.inPreview = (/\/admin\/design/.test(top.location.pathname));
  if (this.inPreview) {
    setTimeout(function () {
      Waypoint.refreshAll();
    }, 800);
  }
  
  searchForm = $('form.search');
  if (searchForm.length) {
    $('body').on('click', 'a[href=#search]', function (e) {
      e.preventDefault();
      searchForm.fadeIn(150);
      if (!isIE()) {
        searchForm.find('input[type=text]').focus()
      }
    });
    $('body').on('click', '.close_search', function (e) {
      e.preventDefault();
      searchForm.fadeOut(150);
    });
  }
  mobileNav = $('.mobile_nav')
  $('body').on('click', '.nav_trigger', function (e) {
    e.preventDefault();
    mobileNav.fadeIn(150);
  });
  $('select').change(function (e) {
    e.preventDefault();
    $(this).blur();
  })
  $('body').on('click', '.close_nav', function (e) {
    e.preventDefault();
    mobileNav.fadeOut(150);
  });
  
  $('#cart input[id$=_qty]').blur(function(e) {
    e.preventDefault();
    $(this).closest('form').submit();
  });
  
  $('#cart .remove').click(function(e) {
    e.preventDefault();
    $(this).closest('li').find('input[id$=_qty]').val(0).closest('form').submit();
  });
  
});
$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    if (searchForm.length) {
      searchForm.fadeOut(150);
    }
    if (mobileNav.length) {
      mobileNav.fadeOut(150);
    }
  }
});