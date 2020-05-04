import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './editor.scss';
import './style.scss';

import { gallery } from '@wordpress/icons';

import { DESKTOP, MOBILE, TABLET } from '../../constants/devicesSizes';
import CarouselSlideQuote from './carousel-types/carousel-quote';
import CarouselSlideImages from './carousel-types/carousel-images';
/**
 * Internal dependencies
 */
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaPlaceholder, BlockIcon } from '@wordpress/block-editor';
import { Placeholder, ButtonGroup, Button } from '@wordpress/components';

const { useState, useCallback, useMemo, useEffect } = wp.element;

const carouselOptions = [
  {
    name: __( 'Quote Cards', 'kili-builder' ),
    Component: CarouselSlideQuote,
    className: 'reviews',
  },
  {
    name: __( 'Images', 'kili-builder' ),
    Component: CarouselSlideImages,
    className: 'industries',
  },
];

export default function CarouselEdit( props ) {
  const {
    attributes,
    className,
    isSelected,
    setAttributes,
  } = props;

  const {
    images,
    selectedCarouselSlideName,
    hasCaption,
    slidesToScroll,
    slidesToShow,
    dots,
    arrows,
  } = attributes;

  const [ selectedCarouselSlide, setSelectedCarouselSlide ] = useState( null );

  useEffect( () => {
    if ( selectedCarouselSlideName ) {
      const newSelectedCarouselSlide = carouselOptions.find( ( option ) => option.className === selectedCarouselSlideName );
      setSelectedCarouselSlide( newSelectedCarouselSlide );
    }
  }, [] );

  const getSlickSettings = () => ( {
    dots: dots[ DESKTOP ].value,
    arrows: arrows[ DESKTOP ].value,
    infinite: false,
    slidesToShow: slidesToShow[ DESKTOP ].value,
    slidesToScroll: slidesToScroll[ DESKTOP ].value,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: dots[ TABLET ].value,
          arrows: arrows[ TABLET ].value,
          slidesToShow: slidesToShow[ TABLET ].value,
          slidesToScroll: slidesToScroll[ TABLET ].value,
          infinite: true,
        },
      }, {
        breakpoint: 640,
        settings: {
          dots: dots[ MOBILE ].value,
          arrows: arrows[ MOBILE ].value,
          slidesToShow: slidesToShow[ MOBILE ].value,
          slidesToScroll: slidesToScroll[ MOBILE ].value,
          infinite: true,
        },
      },
    ],
  } );

  const setImageAttributes = ( index, attributes ) => {
    if ( ! images[ index ] ) {
      return;
    }
    setAttributes( {
      images: [
        ...images.slice( 0, index ),
        {
          ...images[ index ],
          ...attributes,
        },
        ...images.slice( index + 1 ),
      ],
    } );
  };

  const handleImagesSelect = ( newImages ) => {
    setAttributes( {
      images: newImages,
    } );
  };

  const handleLayoutSelect = ( value ) => {
    const newSelectedCarouselSlide = carouselOptions.find( ( option ) => option.className === value );
    setSelectedCarouselSlide( newSelectedCarouselSlide );
    setAttributes( {
      selectedCarouselSlideName: newSelectedCarouselSlide.className,
    } );
  };

  const hasImages = useMemo( () => !! images.length, [ images.length ] );

  if ( ! hasImages ) {
    return (
      <>
        { selectedCarouselSlide
          ? (
            <MediaPlaceholder
              addToGallery={ hasImages }
              isAppender={ hasImages }
              className={ className }
              disableMediaButtons={ hasImages && ! isSelected }
              icon={ ! hasImages && <BlockIcon icon={ gallery } /> }
              labels={ {
                title: ! hasImages && __( 'Carousel' ),
                instructions: ! hasImages && 'Drag images, upload new ones or select files from your library.',
              } }
              onSelect={ handleImagesSelect }
              accept="image/*"
              multiple
              value={ hasImages ? images : undefined }
            />
          ) : (
            <Placeholder
              label={ __( 'Carousel', 'kili-builder' ) }
              instructions={ __( 'Select the type of layout for the carousel.', 'kili-builder' ) }
            >
              <ButtonGroup className="components-kili-button-group">
                { carouselOptions.map( ( option, index ) => (
                  <Button
                    key={ option.name }
                    className="components-kili-button-group__button"
                    isLarge
                    onClick={ () => handleLayoutSelect( option.className ) }
                  >
                    { option.name }
                  </Button>
                ) ) }
              </ButtonGroup>
            </Placeholder> ) }
      </>

    );
  }

  return (
    <>
      { selectedCarouselSlide && (
        <>
          <Inspector { ...props } />
          <Slider className={ selectedCarouselSlide.className } { ...getSlickSettings() }>
            { images.map( ( img, index ) => (
              <div className="kili-carousel__slide" key={ img.url }>
                <selectedCarouselSlide.Component
                  url={ img.url }
                  alt={ img.alt }
                  id={ img.id }
                  setAttributes={ ( attrs ) =>
                    setImageAttributes( index, attrs )
                  }
                  hasCaption={ hasCaption }
                  caption={ img.caption }
                  author={ img.author }
                  title={ img.title }
                />
              </div>
            ) ) }
          </Slider>
        </> ) }
    </>
  );
}

