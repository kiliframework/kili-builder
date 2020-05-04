import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { Spinner } from '@wordpress/components';

const { useEffect } = wp.element;

const CarouselImages = ( { url, alt, id, caption, image, setAttributes, hasCaption } ) => {
  useEffect( () => {
    if ( image && ! url ) {
      setAttributes( {
        url: image.source_url,
        alt: image.alt_text,
      } );
    }
  }, [ image, url ] );

  return (
    <div className="flexgrid__item xsmall--col-2 small--col-2 medium--col-2 last-col">
      <div className="industries-carousel__item">
        <img
          className="icon"
          src={ url }
          alt={ alt }
          data-id={ id }
          tabIndex="0"
        />
        { isBlobURL( url ) && <Spinner /> }
        { hasCaption && <RichText
          tagName="p"
          className="item-title"
          placeholder="Insert caption"
          value={ caption }
          onChange={ ( newCaption ) =>
            setAttributes( { caption: newCaption } )
          }
          inlineToolbar
        /> }
      </div>
    </div>
  );
};

export default compose( [
  withSelect( ( select, ownProps ) => {
    const { getMedia } = select( 'core' );
    const { id } = ownProps;

    return {
      image: id ? getMedia( parseInt( id, 10 ) ) : null,
    };
  } ),
] )( CarouselImages );
