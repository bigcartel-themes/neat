"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("preloader");
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

window.addEventListener("load", () => {
  document.body.classList.remove("transition-preloader");
  setDocHeight();
  setHeaderPosition();
  resizeHomeWelcome();
  animateHomeElements();
  $(".home-carousel").css("opacity", "1");
});
window.addEventListener("resize", () => {
  setDocHeight();
  resizeHomeWelcome();
});
window.addEventListener("scroll", () => {
  animateHomeElements();
  setHeaderPosition();
});

function setHeaderPosition() {
  let header_nav_height = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
  let annMessageHeight = $(".announcement-message.visible").outerHeight() > 0 ? $(".announcement-message.visible").outerHeight() : 0;
  if ($(window).scrollTop() >= annMessageHeight) {
    $("header").addClass("fixed");
    $("body").css("padding-top", header_nav_height);
  } else {
    $("header").removeClass("fixed");
    $("body").css("padding-top", 0);
  }
}

function resizeHomeWelcome() {
  let announceDiv = document.querySelector(".announcement-message");
  let welcomeContainer = document.querySelector(".welcome_image");
  if (announceDiv && welcomeContainer) {
    $(".welcome_image").css("height", "calc(100svh - " + announceDiv.offsetHeight + "px)");
  }
}

function setDocHeight() {
  win_height = window.innerHeight;
  document.documentElement.style.setProperty("--vh", win_height / 100 + "px");
}

function animateHomeElements() {
  const featured = document.querySelector(".welcome_text");
  const content_container = document.querySelector(".content");
  const contentRec = content_container.getBoundingClientRect();
  if (featured) {
    const featuredRect = featured.getBoundingClientRect();
    if (featuredRect.top <= 90) {
      featured.classList.add("fade_out")
    } else {
      featured.classList.remove("fade_out")
    }
  }
  if (contentRec.top <= 195) {
    $("header").addClass("background_overlay");
  } else {
    $("header").removeClass("background_overlay");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const welcomeButton = document.querySelector(".welcome_button");
  if (welcomeButton) {
    welcomeButton.addEventListener("click", function (event) {
      console.log(themeOptions.welcomeButtonBehavior);
      if (themeOptions.welcomeButtonBehavior === "scroll") {
        event.preventDefault();
        const targetElement = document.querySelector("#main");
        if (targetElement) {
          smoothScroll(targetElement, 1000, 250);
        }
      } else if (themeOptions.welcomeButtonBehavior === "navigate") {
        if (isExternalLink(event.target.href)) {
          event.preventDefault();
          event.stopPropagation();
          window.open(event.target.href, '_blank', 'noopener,noreferrer');
        }
        // Let internal links use template's href naturally
      }
    });
  }

  // Handle separate button and slideshow link functionality
  const isHomePage = document.body.getAttribute('data-bc-page-type') === 'home';
  const welcomeButtonLink = themeOptions.welcomeButtonLink && themeOptions.welcomeButtonLink.trim() !== '' ? themeOptions.welcomeButtonLink : null;
  const welcomeSlideshowLink = themeOptions.welcomeSlideshowLink && themeOptions.welcomeSlideshowLink.trim() !== '' ? themeOptions.welcomeSlideshowLink : null;
  
  // Make slideshow clickable if welcomeSlideshowLink is configured and no button is shown
  if (isHomePage && !welcomeButton && welcomeSlideshowLink) {
    const slideshow = document.querySelector(".home-carousel");
    if (slideshow) {
      // Add styling and accessibility attributes to individual slides
      const slides = slideshow.querySelectorAll('.splide__slide');
      slides.forEach(slide => {
        slide.classList.add("slideshow-clickable");
        slide.setAttribute("role", "button");
        slide.setAttribute("aria-label", "Navigate to " + welcomeSlideshowLink);
      });

      // Use event delegation - single listener on slideshow container
      slideshow.addEventListener("click", function(event) {
        // Find the closest slide element
        const clickedSlide = event.target.closest('.splide__slide');
        
        // Only handle clicks on slides, not on splide controls
        if (clickedSlide && !event.target.closest('.splide__arrow, .splide__pagination')) {
          event.preventDefault();
          event.stopPropagation();
          if (isExternalLink(welcomeSlideshowLink)) {
            window.open(welcomeSlideshowLink, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = welcomeSlideshowLink;
          }
        }
      });
    }
  }
});