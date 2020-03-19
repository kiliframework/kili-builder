/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';
import times from 'lodash/times';
import find from 'lodash/find';
import pick from 'lodash/pick';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './editor.scss';
import './style.scss';

import { gallery } from '@wordpress/icons';

import CarouselSlide from './carousel-slide';


/**
 * Internal dependencies
 */
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, MediaPlaceholder, BlockIcon } from '@wordpress/block-editor';
import map from 'lodash/map';

const { useState } = wp.element;

export default function CarouselEdit(props) {

  const [attachmentCaptions, setAttachmentCaptions] = useState(null);

  const {
    attributes,
    className,
    isSelected,
  } = props;

  const {
    images,
  } = attributes;

  const setAttributes = ( attributes ) => {
		if ( attributes.images ) {      
			attributes = {
				...attributes,
				// Unlike images[ n ].id which is a string, always ensure the
				// ids array contains numbers as per its attribute type.
				ids: map( attributes.images, ( { id } ) => parseInt( id, 10 ) ),
			};
		}

		props.setAttributes( attributes );
	}

  const setImageAttributes = ( index, attributes ) => {
		const {
			attributes: { images },
		} = props;
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
	}

  const fluidCarouselSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    draggable: false,
    variableWidth: true,
    adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const selectCaption = ( newImage, images, attachmentCaptions ) => {
		// The image id in both the images and attachmentCaptions arrays is a
		// string, so ensure comparison works correctly by converting the
		// newImage.id to a string.
		const newImageId = toString( newImage.id );
		const currentImage = find( images, { id: newImageId } );

		const currentImageCaption = currentImage
			? currentImage.caption
			: newImage.caption;

		if ( ! attachmentCaptions ) {
			return currentImageCaption;
		}

		const attachment = find( attachmentCaptions, {
			id: newImageId,
		} );

		// if the attachment caption is updated
		if ( attachment && attachment.caption !== newImage.caption ) {
			return newImage.caption;
		}

		return currentImageCaption;
	}

  const onSelectImages = ( newImages ) => {

    setAttachmentCaptions( newImages.map( ( newImage ) => ( {
      // Store the attachmentCaption id as a string for consistency
      // with the type of the id in the images attribute.
      id: newImage.id.toString(),
      caption: newImage.caption,
    } ) ),);
        
		setAttributes( {
			images: newImages.map( ( newImage ) => {
        return ( {
          ...pick( newImage, [ 'alt', 'id', 'link', 'caption', 'url' ] ),
          caption: selectCaption(
            newImage,
            images,
            attachmentCaptions
          ),
          // The id value is stored in a data attribute, so when the
          // block is parsed it's converted to a string. Converting
          // to a string here ensures it's type is consistent.
          id: newImage.id.toString(),
        } )
      } ),
		} );
	}

  const hasImages = !! images.length;
  

  if ( ! hasImages ) {
    return ( 
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
          onSelect={ onSelectImages }
          accept="image/*"
          multiple
          value={ hasImages ? images : undefined }
        />
    )
  }
  
  return (
    <>
      <Slider className="reviews" {...fluidCarouselSettings}>
        { images.map((img, index) => (
          <div className="kili-carousel__slide"  key={img.url}>
            <CarouselSlide
              url={ img.url }
              alt={ img.alt }
              id={ img.id }
              isFirstItem={ index === 0 }
              isLastItem={ index + 1 === images.length }
              setAttributes={ ( attrs ) =>
                setImageAttributes( index, attrs )
              }
              caption={ img.caption }
              author={ img.author }
              title={ img.title }
            />
          </div>
        ))}
      </Slider>
    </>
  )
}

