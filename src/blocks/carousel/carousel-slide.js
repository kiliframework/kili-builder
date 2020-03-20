import { Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { compose } from '@wordpress/compose';

const { useState, useEffect } = wp.element;

function CarouselSlide( {
  url,
  alt,
  id,
  caption,
  author,
  title,
  setAttributes,
  image,
  carouselType
} ) {
  useEffect( () => {
    if ( image && ! url ) {
      setAttributes( {
        url: image.source_url,
        alt: image.alt_text,
      } );
    }
  }, [ image, url ] );
  
  return (
    <>
      {carouselType === 'Images' ? <div class="flexgrid__item xsmall--col-2 small--col-2 medium--col-2 last-col">
          <div class="industries-carousel__item">
            <img
              className="icon"
              src={ url }
              alt={ alt }
              data-id={ id }
              tabIndex="0"
            />
            { isBlobURL( url ) && <Spinner /> }
            <p class="item-title">MedTech</p>
          </div>
      </div> : (<div className="flexgrid__item xsmall--col-4 small--col-4 medium--col-4">
        <a href="#as">
          <div className="review flexgrid flexgrid--flex-column">
            <div className="review__avatar">
              <img
                className="avatar"
                src={ url }
                alt={ alt }
                data-id={ id }
                tabIndex="0"
              />
              { isBlobURL( url ) && <Spinner /> }
            </div>
            <div className="review__quote">
              <RichText
                tagName="blockquote"
                placeholder="Insert quote"
                value={ caption }
                onChange={ ( newCaption ) =>
                  setAttributes( { caption: newCaption } )
                }
                inlineToolbar
              />
            </div>
            <div className="review__signature">
              <RichText
                tagName="span"
                className="review__signature-author"
                placeholder="Insert author"
                value={ author }
                onChange={ ( newCaption ) =>
                  setAttributes( { author: newCaption } )
                }
                inlineToolbar
              />
              <RichText
                className="review__signature-title"
                tagName="span"
                placeholder="Insert title"
                value={ title }
                onChange={ ( newCaption ) =>
                  setAttributes( { title: newCaption } )
                }
                inlineToolbar
              />
            </div>
          </div>
        </a>
      </div>)}
    </> );
}

export default compose( [
  withSelect( ( select, ownProps ) => {
    const { getMedia } = select( 'core' );
    const { id } = ownProps;

    return {
      image: id ? getMedia( parseInt( id, 10 ) ) : null,
    };
  } ),
  withDispatch( ( dispatch ) => {
    const { __unstableMarkNextChangeAsNotPersistent } = dispatch(
      'core/block-editor'
    );
    return {
      __unstableMarkNextChangeAsNotPersistent,
    };
  } ),
] )( CarouselSlide );
