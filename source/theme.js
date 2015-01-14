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
//= require javascripts/cart
//= require javascripts/waypoints

$(function(){
  screenWidth = $(window).width();
});

$(window).resize(function () {
   screenWidth = $(window).width();
});

$(document).ready(function() {

  $('.featured').waypoint(function(direction) {
    if (direction === 'down') {
      if (screenWidth > 800) { $(this).fadeOut(250); }
    }
  }, {
    offset: '100'
  }).waypoint(function(direction) {
    if (direction === 'up') {
      if (screenWidth > 800) { $(this).fadeIn(500); }
    }
  }, {
    offset: '120'
  });

  $('.content').waypoint(function(direction) {
    if (direction === 'down') {
      if (screenWidth > 800) { $('header').toggleClass('overlay') }
      
    }
  }, {
    offset: '120'
  }).waypoint(function(direction) {
    if (direction === 'up') {
      if (screenWidth > 800) { $('header').toggleClass('overlay') }
    }
  }, {
    offset: '80'
  });

  $('.custom *').removeAttr('style');

  // search

  searchForm = $('form.search');

  if(searchForm.length > 0) {
    $('body').on('click', 'a[href=#search]', function(e) {
      e.preventDefault();
      searchForm.show();
      searchForm.find('input[type=text]').focus()
    });

    $('body').on('click', '.close_search', function(e) {
      searchForm.hide();
    });
  }

  // mobile nav

  mobileNav = $('.mobile_nav')

  $('body').on('click', '.nav_trigger', function(e) {
    e.preventDefault();
    mobileNav.show();
  });

  $('body').on('click', '.close_nav', function(e) {
    mobileNav.hide();
  });
});
$(document).keyup(function(e) {
  if (e.keyCode == 27) {
	  if (searchForm.length > 0) { searchForm.hide(); }
	  if (mobileNav.length > 0) { mobileNav.hide(); }
  }
});
