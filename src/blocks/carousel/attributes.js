import { defaultAttrBuilder } from '../utils';
import { DESKTOP, MOBILE, TABLET } from '../../constants/devicesSizes';

export default {
  images: {
    type: 'array',
    default: [],
    source: 'query',
    selector: '.kili-carousel-slide',
    query: {
      url: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src',
      },
      link: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'data-link',
      },
      alt: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'alt',
        default: '',
      },
      id: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'data-id',
      },
      caption: {
        type: 'string',
        source: 'html',
        selector: 'p,blockquote',
      },
      author: {
        type: 'string',
        source: 'html',
        selector: '.kili-carousel-slide__author,.review__signature-author',
      },
      title: {
        type: 'string',
        source: 'html',
        selector: '.kili-carousel-slide__title,.review__signature-title',
      },
    },
  },
  slidesToShow: defaultAttrBuilder( null, {
    [ DESKTOP ]: 3,
    [ TABLET ]: 2,
    [ MOBILE ]: 1,
  } ),
  slidesToScroll: defaultAttrBuilder( null, {
    [ DESKTOP ]: 3,
    [ TABLET ]: 2,
    [ MOBILE ]: 1,
  } ),
  dots: defaultAttrBuilder( null, {
    [ DESKTOP ]: true,
    [ TABLET ]: false,
    [ MOBILE ]: false,
  } ),
  arrows: defaultAttrBuilder( null, {
    [ DESKTOP ]: false,
    [ TABLET ]: false,
    [ MOBILE ]: false,
  } ),
  infinite: defaultAttrBuilder( null, {
    [ DESKTOP ]: false,
    [ TABLET ]: true,
    [ MOBILE ]: true,
  } ),

  selectedCarouselSlideName: {
    type: 'string',
    default: null,
  },
  hasCaption: {
    type: 'boolean',
    default: true,
  },
};
