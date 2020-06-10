

function setDocHeight() {
  win_width = window.innerWidth;
  win_height = window.innerHeight;
  document.documentElement.style.setProperty('--vh', win_height/100 + "px");
}


$(document).ready(function () {

  $('.image-gallery').magnificPopup({
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
      setDocHeight();
    }, 800);
  }
  else {
    setDocHeight();
  }
  var windowWidth = $(window).width();
  $(window).resize(function(){
    if ($(window).width() != windowWidth) {
      windowWidth = $(window).width();
      setDocHeight()
    }
  });
  $('body').on('click', '.open-search-button', function (e) {
    openOverlay('.search-overlay');
    $('#search-input').focus();
  });

  $('body').on('click', '.open-mobile-navigation', function (e) {
    openOverlay('.mobile-navigation');
  });

});
$('body').on('click', '.close-overlay', function (e) {
  closeOverlay();
});

$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    closeOverlay();
  }
});

var openOverlay = function(overlay_type) {
  $('body').addClass('no-scroll');
  $(overlay_type).addClass('open');
}
var closeOverlay = function(overlay_type = '') {
  if (overlay_type) {
    $(overlay_type).removeClass('open');
  }
  else {
    $('.full-screen-overlay').removeClass('open');
  }
  $('body').removeClass('no-scroll');
}
var isGreaterThanZero = function(currentValue) {
  return currentValue > 0;
}

function arrayContainsArray(superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}

function unique(item, index, array) {
  return array.indexOf(item) == index;
}

function cartesianProduct(a) {
  var i, j, l, m, a1, o = [];
  if (!a || a.length == 0) return a;
  a1 = a.splice(0, 1)[0];
  a = cartesianProduct(a);
  for (i = 0, l = a1.length; i < l; i++) {
    if (a && a.length) for (j = 0, m = a.length; j < m; j++)
      o.push([a1[i]].concat(a[j]));
    else
      o.push([a1[i]]);
  }
  return o;
}

Array.prototype.equals = function (array) {
  if (!array)
    return false;
  if (this.length != array.length)
    return false;
  for (var i = 0, l=this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false;
    }
    else if (this[i] != array[i]) {
      return false;
    }
  }
  return true;
}

// From https://github.com/kevlatus/polyfill-array-includes/blob/master/array-includes.js
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function (searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) {
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }
      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}

Array.prototype.count = function (filterMethod) {
  return this.reduce(function (count, item) {
    return filterMethod(item) ? count + 1 : count;
  }, 0);
};

$('.product_option_select').on('change',function() {
  var option_price = $(this).find("option:selected").attr("data-price");
  enableAddButton(option_price);
});
function enableAddButton(updated_price) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  addButton.attr("disabled",false);
  if (updated_price) {
    priceTitle = ' - ' + Format.money(updated_price, true, true);
  }
  else {
    priceTitle = '';
  }
  addButton.html(addButtonTitle + priceTitle);
  addButton.attr('aria-label',addButton.text());
}

function disableAddButton(type) {
  var addButton = $('.add-to-cart-button');
  var addButtonTitle = addButton.attr('data-add-title');
  if (type == "sold-out") {
    var addButtonTitle = addButton.attr('data-sold-title');
  }
  if (!addButton.is(":disabled")) {
    addButton.attr("disabled","disabled");
  }
  addButton.html(addButtonTitle);
  addButton.attr('aria-label','');
}

function enableSelectOption(select_option) {
  select_option.removeAttr("disabled");
  select_option.text(select_option.attr("data-name"));
  select_option.removeAttr("disabled-type");
  if ((select_option.parent().is('span'))) {
    select_option.unwrap();
  }
}
function disableSelectOption(select_option, type) {
  if (type === "sold-out") {
    disabled_text = select_option.parent().attr("data-sold-text");
    disabled_type = "sold-out";
    if (show_sold_out_product_options === 'false') {
      hide_option = true;
    }
    else {
      hide_option = false;
    }
  }
  if (type === "unavailable") {
    disabled_text = select_option.parent().attr("data-unavailable-text");
    disabled_type = "unavailable";
    hide_option = true;
  }
  if (select_option.val() > 0) {
    var name = select_option.attr("data-name");
    select_option.attr("disabled",true);
    select_option.text(name + ' ' + disabled_text);
    select_option.attr("disabled-type",disabled_type);
    if (hide_option === true) {
      if (!(select_option.parent().is('span'))) {
        select_option.wrap('<span>');
      }
    }
  }
}