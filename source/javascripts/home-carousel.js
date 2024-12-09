const homeSlideshowContainer = document.querySelector('.home-carousel');
if (homeSlideshowContainer) {
  document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.home-carousel', {
      arrows: false,
      type: 'slide',
      keyboard: true,
      autoplay: themeOptions.homepageSlideshowAutoplay,
      interval: themeOptions.homepageSlideshowSpeed,
      speed: 1500,
      pauseOnHover: false,
    } );
    splide.mount();
  });
}