import { RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

import BannerData from './data';
import { attrClassCreator } from '../utils';

export default function BannerSave( { attributes } ) {
  const { url, id, alt, headingText, buttonText, buttonBackgroundColor, buttonTextColor, level } = attributes;
  const tagName = 'h' + level;
  const buttonClasses = attrClassCreator( { buttonBackgroundColor, buttonTextColor } );

  return (
    <section className="main-banner" style={ { backgroundColor: '#0BD8A2' } }>
      <div className="main-banner__wave-wrapper">
        <svg role="img" className="main-banner__wave" width="100%" height="620px" fill="none" aria-labelledby="main-banner-wave-title">
          <title id="main-banner-wave-title">Main banner animation wave</title>
          <path fill="white" d={ BannerData.svg.path }>
            <animate repeatCount="indefinite" fill="freeze" attributeName="d" dur="30s">
            </animate>
          </path>
        </svg>
      </div>
      <div className="container">
        <div className="flexgrid medium--middle flexgrid--full">
          <div className="flexgrid__item xsmall--col-12 small--col-12 medium--col-7">
            <div className="main-banner__content-wrapper">
              <RichText.Content className="alpha headline" tagName={ level && tagName } value={ headingText } />
              <div className="button__wrapper">
                <a href="/contact/" className={ classnames( buttonClasses, 'button', 'button--default', 'main-banner__button' ) }><RichText.Content value={ buttonText } /></a>
              </div>
            </div>
          </div>
          <div className="flexgrid__item xsmall--col-12 small--col-12 medium--col-5">
            <div className="main-banner__image-wrapper">
              <img src={ url } className="main-banner__image" alt={ alt } data-id={ id } />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
