/**
 * Init Slick Slider on jquery.
 */
// eslint-disable-next-line no-undef
jQuery( document ).ready( function( $ ) {
  /**
   * init Slick Slider
   *
   * @param {Object} container the slider container.
   */
  function kiliBlockCarouselInit( container ) {
    const sliderArrows = container.data( 'slider-arrows' ),
      sliderDots = container.data( 'slider-dots' ),
      slidesToScrollDesktop = parseInt( container.attr( 'data-scroll-desktop' ) ),
      slidesToScrollTablet = parseInt( container.attr( 'data-scroll-tablet' ) ),
      slidesToScrollMobile = parseInt( container.attr( 'data-scroll-mobile' ) ),
      slidesToShowDesktop = parseInt( container.attr( 'data-columns-desktop' ) ),
      slidesToShowTablet = parseInt( container.attr( 'data-columns-tablet' ) ),
      slidesToShowMobile = parseInt( container.attr( 'data-columns-mobile' ) );

    container.slick( {
      slidesToScroll: slidesToScrollDesktop,
      slidesToShow: slidesToShowDesktop,
      arrows: true,
      fade: false,
      dots: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: slidesToShowTablet,
            slidesToScroll: slidesToScrollTablet,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: slidesToShowMobile,
            slidesToScroll: slidesToScrollMobile,
          },
        },
      ],
    } );
  }
  $( '.kili-blocks-carousel-init' ).each( function() {
    const container = $( this );
    kiliBlockCarouselInit( container );
  } );
} );
