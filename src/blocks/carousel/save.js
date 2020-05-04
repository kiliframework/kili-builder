import { DESKTOP, TABLET, MOBILE } from '../../constants';
import CarouselImagesView from './carousel-images-view';
import CarouselQuotesView from './carousel-quotes-view';

export default function save( { attributes } ) {
  const {
    images,
    slidesToShow,
    slidesToScroll,
    dots,
    arrows,
    infinite,
    selectedCarouselSlideName,
  } = attributes;

  return (
    <div
      className={ `kili-blocks-carousel-init ${ selectedCarouselSlideName }` }
      data-columns-desktop={ slidesToShow[ DESKTOP ].value }
      data-columns-tablet={ slidesToShow[ TABLET ].value }
      data-columns-mobile={ slidesToShow[ MOBILE ].value }
      data-scroll-desktop={ slidesToScroll[ DESKTOP ].value }
      data-scroll-tablet={ slidesToScroll[ TABLET ].value }
      data-scroll-mobile={ slidesToScroll[ MOBILE ].value }
    >
      { images.map( ( image ) => (
        <div className="kili-carousel-slide" key={ image.url }>
          { selectedCarouselSlideName === 'industries' && <CarouselImagesView image={ image } /> }
          { selectedCarouselSlideName === 'reviews' && <CarouselQuotesView image={ image } /> }
        </div>
      ) ) }
    </div>

  );
}
