"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("preload");

  let contactFields = document.querySelectorAll(".contact-form input, .contact-form textarea");
  contactFields.forEach(function (contactField) {
    contactField.removeAttribute("tabindex");
  });
  const numShades = 5;

  let cssProperties = [];

  for (const themeColor in themeColors) {
    const hexValue = themeColors[themeColor];
    var hsl = tinycolor(hexValue).toHsl();
    for (var i = numShades - 1; i >= 0; i -= 1) {
      hsl.l = (i + 0.5) / numShades;
      cssProperties.push(`--${camelCaseToDash(themeColor)}-${((i * 100) / 1000) * 200}: ${tinycolor(hsl).toRgbString()};`);
    }
    numColor = tinycolor(hexValue).toRgb();
    cssProperties.push(`--${camelCaseToDash(themeColor)}-rgb: ${numColor["r"]}, ${numColor["g"]}, ${numColor["b"]};`);
  }

  const headTag = document.getElementsByTagName("head")[0];
  const styleTag = document.createElement("style");

  styleTag.innerHTML = `
    :root {
      ${cssProperties.join("\n")}
    }
  `;
  headTag.appendChild(styleTag);
});

function camelCaseToDash(string) {
  return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

window.addEventListener("load", () => {
  document.body.classList.remove("transition-preload");
  resizeHomeCarousel();
  setDocHeight();
  setHeaderPosition();
});
window.addEventListener("resize", () => {
  setDocHeight();
  resizeHomeCarousel();
});
window.addEventListener("scroll", () => {
  animateElementsOnScroll();
  setHeaderPosition();
});

function setHeaderPosition() {
  let header_nav_height = $("header").outerHeight();
  let annMessageHeight = $(".announcement-message.visible").outerHeight() > 0 ? $(".announcement-message.visible").outerHeight() : 0;
  if ($(window).scrollTop() >= annMessageHeight) {
    $("header").addClass("fixed");
    $("body").css("padding-top", header_nav_height + "px");
  } else {
    $("header").removeClass("fixed");
    $("body").css("padding-top", 0);
  }
}

function resizeHomeCarousel() {
  let announceDiv = document.querySelector(".announcement-message");
  let slideshowContainer = document.querySelector(".slideshow");
  if (announceDiv && slideshowContainer) {
    $(".slideshow, .splide__track").css("height", "calc(calc((var(--vh, 1vh) * 100)) - " + announceDiv.offsetHeight + "px)");
  }
}

function setDocHeight() {
  win_height = window.innerHeight;
  document.documentElement.style.setProperty("--vh", win_height / 100 + "px");
}

function animateElementsOnScroll() {
  const featured = document.querySelector(".featured");
  const content_container = document.querySelector(".content");
  const contentRec = content_container.getBoundingClientRect();
  if (featured) {
    const featuredRect = featured.getBoundingClientRect();
    if (featuredRect.top <= 180) {
      $(".featured").css({ opacity: 0 });
    } else {
      $(".featured").css({ opacity: 1 });
    }
  }
  if (contentRec.top <= 280) {
    $("header").addClass("overlay");
  } else {
    $("header").removeClass("overlay");
  }
}

$("body").on("click", ".open-mobile-navigation", function (e) {
  openOverlay(".mobile-navigation");
});
$("body").on("click", ".close-overlay", function (e) {
  closeOverlay();
});

$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    closeOverlay();
  }
});

var openOverlay = function (overlay_type) {
  $("body").addClass("no-scroll");
  $(overlay_type).addClass("open");
};
var closeOverlay = function (overlay_type = "") {
  if (overlay_type) {
    $(overlay_type).removeClass("open");
  } else {
    $(".full-screen-overlay").removeClass("open");
  }
  $("body").removeClass("no-scroll");
};
var isGreaterThanZero = function (currentValue) {
  return currentValue > 0;
};

function arrayContainsArray(superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return superset.indexOf(value) >= 0;
  });
}

function unique(item, index, array) {
  return array.indexOf(item) == index;
}

function cartesianProduct(a) {
  var i,
    j,
    l,
    m,
    a1,
    o = [];
  if (!a || a.length == 0) return a;
  a1 = a.splice(0, 1)[0];
  a = cartesianProduct(a);
  for (i = 0, l = a1.length; i < l; i++) {
    if (a && a.length) for (j = 0, m = a.length; j < m; j++) o.push([a1[i]].concat(a[j]));
    else o.push([a1[i]]);
  }
  return o;
}

Array.prototype.equals = function (array) {
  if (!array) return false;
  if (this.length != array.length) return false;
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      return false;
    }
  }
  return true;
};

// From https://github.com/kevlatus/polyfill-array-includes/blob/master/array-includes.js
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
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
        return x === y || (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y));
      }
      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }
      return false;
    },
  });
}

Array.prototype.count = function (filterMethod) {
  return this.reduce(function (count, item) {
    return filterMethod(item) ? count + 1 : count;
  }, 0);
};
