import { RichText, MediaPlaceholder, BlockIcon } from '@wordpress/block-editor';
import classnames from 'classnames';

import { gallery } from '@wordpress/icons';

import BannerData from './data';

import './editor.scss';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

import Inspector from './inspector';
import { editClassCreator } from '../utils/editClassCreator';
import { getDeviceValue } from '../utils';
import { DESKTOP } from '../../constants/devicesSizes';

const { useEffect } = wp.element;

const getAnimateValue = () => {
  let values = '';
  for ( const value of BannerData.svg.loop ) {
    values += value;
  }
  return values;
};

function BannerEdit( props ) {
  const { attributes, setAttributes, isSelected, savedImage } = props;
  const { url, alt, id, headingText, buttonText, fontSize, lineHeight, letterSpacing,
    buttonBackgroundColor, buttonBorderRadius, buttonPlaceholder, buttonTextColor } = attributes;

  const fontSizeValue = getDeviceValue( fontSize, DESKTOP );
  const lineHeightValue = getDeviceValue( lineHeight, DESKTOP );
  const letterSpacingValue = getDeviceValue( letterSpacing, DESKTOP );
  console.log( attributes );

  useEffect( () => {
    if ( savedImage && ! url ) {
      setAttributes( {
        url: savedImage.source_url,
        alt: savedImage.alt_text,
      } );
    }
  }, [ savedImage ] );

  const handleImagesSelect = ( image ) => {
    setAttributes( { url: image.url, id: image.id, alt: image.alt } );
  };

  const handleButtonChange = ( value ) => {
    console.log( value );
    setAttributes( { buttonText: value } );
  };

  return (
    <>
      <Inspector { ...props } onImageSelect={ handleImagesSelect } />
      <section className="main-banner" style={ { backgroundColor: '#0BD8A2' } }>
        <div className="main-banner__wave-wrapper">
          <svg role="img" className="main-banner__wave" width="100%" height="620px" fill="none" aria-labelledby="main-banner-wave-title">
            <title id="main-banner-wave-title">Main banner animation wave</title>
            <path fill="white" d={ BannerData.svg.path }>
              <animate repeatCount="indefinite" fill="freeze" attributeName="d" dur="30s" values={ getAnimateValue() }>
              </animate>
            </path>
          </svg>
        </div>
        <div className="container">
          <div className="flexgrid medium--middle flexgrid--full">
            <div className="flexgrid__item xsmall--col-12 small--col-12 medium--col-7">
              <div className="main-banner__content-wrapper">
                <RichText
                  style={
                    editClassCreator( attributes ),
                    {
                      fontSize: `${ fontSizeValue }`,
                      letterSpacing: `${ letterSpacingValue }`,
                      lineHeight: `${ lineHeightValue }`,
                    }
                  }
                  as="h2"
                  className="alpha headline"
                  placeholder="Insert banner header"
                  value={ headingText }
                  onChange={ ( value ) => setAttributes( { headingText: value } ) }
                />
                <div className="button__wrapper">
                  <RichText
                    placeholder={ buttonPlaceholder || __( 'Add button text', 'kili-builder' ) }
                    value={ buttonText }
                    onChange={ handleButtonChange }
                    className={ classnames( 'wp-block-button__link', {
                      'no-border-radius': buttonBorderRadius === 0,
                    } ) }
                    style={ {
                      backgroundColor: buttonBackgroundColor[ DESKTOP ].value.normal,
                      color: buttonTextColor[ DESKTOP ].value.normal,
                      zIndex: 1,
                      position: 'relative',
                      borderRadius: buttonBorderRadius
                        ? buttonBorderRadius + 'px'
                        : undefined,
                    } }
                  />
                  <img className="button__wave" src={ kili_images.waves } alt="waves background" />
                </div>
              </div>
            </div>
            <div className="flexgrid__item xsmall--col-12 small--col-12 medium--col-5">
              <div className="main-banner__image-wrapper">
                { ! url ? <MediaPlaceholder
                  className="main-banner__image"
                  icon={ <BlockIcon icon={ gallery } /> }
                  labels={ {
                    title: __( 'Banner image' ),
                    instructions: ! 'Drag images, upload new ones or select files from your library.',
                  } }
                  onSelect={ handleImagesSelect }
                  accept="image/*"
                />
                  : <img src={ url } className="main-banner__image" alt={ alt } data-id={ id } />
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default compose( [
  withSelect( ( select, ownProps ) => {
    const { getMedia } = select( 'core' );
    const { attributes } = ownProps;
    const { id } = attributes;
    return {
      savedImage: id ? getMedia( parseInt( id, 10 ) ) : null,
    };
  } ),
] )( BannerEdit );
