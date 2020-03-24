import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './editor.scss';
import './style.scss';

import { gallery } from '@wordpress/icons';

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
    slickSettings: {
      dots: true,
      arrows: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          },
        }, {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          },
        },
      ],
    },
  },
  {
    name: __( 'Images', 'kili-builder' ),
    Component: CarouselSlideImages,
    className: 'industries',
    slickSettings: {
      dots: false,
      arrows: false,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 5,
    },
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
    slickSettings,
    hasCaption,
  } = attributes;

  const [ selectedCarouselSlide, setSelectedCarouselSlide ] = useState( null );

  useEffect( () => {
    if ( selectedCarouselSlideName ) {
      const newSelectedCarouselSlide = carouselOptions.find( ( option ) => option.name === selectedCarouselSlideName );
      setSelectedCarouselSlide( newSelectedCarouselSlide );
    }
  }, [] );

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
    const newSelectedCarouselSlide = carouselOptions.find( ( option ) => option.name === value );
    setSelectedCarouselSlide( newSelectedCarouselSlide );
    setAttributes( {
      slickSettings: newSelectedCarouselSlide.slickSettings,
      selectedCarouselSlideName: newSelectedCarouselSlide.name,
    } );
  };

  const hasImages = useMemo( () => !! images.length, [ images.length ] );

  if ( ! hasImages ) {
    return (
      <>
        { selectedCarouselSlide ? ( <MediaPlaceholder
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
        /> ) : (
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
                  onClick={ () => handleLayoutSelect( option.name ) }
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
          <Slider className={ selectedCarouselSlide.className } { ...slickSettings }>
            { images.map( ( img, index ) => (
              <div className="kili-carousel__slide" key={ img.url }>
                <selectedCarouselSlide.Component
                  url={ img.url }
                  alt={ img.alt }
                  id={ img.id }
                  setAttributes={ ( attrs ) =>
                    setImageAttributes( index, attrs )
                  }
                  hasCaption={hasCaption}
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

