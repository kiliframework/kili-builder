import { RichText, MediaPlaceholder, BlockIcon } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { gallery } from '@wordpress/icons';
import classnames from 'classnames';

import { editClassCreator } from '../utils/editClassCreator';
import { getDeviceValue } from '../utils';
import { DESKTOP } from '../../constants/devicesSizes';
import withClientID from '../../hoc/withClientID';
import withStyles from '../../hoc/withStyles';
import withUniqueClassName from '../../hoc/withUniqueClassName';

import Inspector from './inspector';
import BannerData from './data';

import AdvancedRichText from '../../components/AdvancedRichText';
import styles from './style';
import './editor.scss';

const { useEffect } = wp.element;

const getAnimateValue = () => {
  let values = '';
  for ( const value of BannerData.svg.loop ) {
    values += value;
  }
  return values;
};

function BannerEdit( props ) {
  const { attributes, setAttributes, savedImage } = props;
  const {
    url,
    alt,
    id,
    buttonBackgroundColor,
    buttonBorderRadius,
    buttonPlaceholder,
    buttonTextColor,
    level,
    uniqueClassName,
  } = attributes;

  const tagName = 'h' + level;

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

  return (
    <>
      <Inspector { ...props } onImageSelect={ handleImagesSelect } />
      <section className={ classnames( 'main-banner', uniqueClassName ) } style={ { backgroundColor: '#0BD8A2' } }>
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
                <AdvancedRichText
                  attributeName="headingText"
                  tagName={ level && tagName }
                  className={ classnames( 'alpha', 'headline', 'kili-banner__header' ) }
                  placeholder="Insert banner header"
                />
                <div className="button__wrapper">
                  <AdvancedRichText
                    attributeName="buttonText"
                    placeholder={ buttonPlaceholder || __( 'Add button text', 'kili-builder' ) }
                    className={ classnames( 'wp-block-button__link', 'kili-banner__button' ) }
                    style={ {
                      backgroundColor: buttonBackgroundColor[ DESKTOP ].value.normal,
                      color: buttonTextColor[ DESKTOP ].value.normal,
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
                { ! url
                  ? <MediaPlaceholder
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
  withClientID,
  withSelect( ( select, ownProps ) => {
    const { getMedia } = select( 'core' );
    const { attributes } = ownProps;
    const { id } = attributes;
    return {
      savedImage: id ? getMedia( parseInt( id, 10 ) ) : null,
    };
  } ),
  withUniqueClassName,
  withStyles( styles ),
] )( BannerEdit );
