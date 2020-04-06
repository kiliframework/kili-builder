import { RichText } from '@wordpress/block-editor';

import BannerData from './data';

export default function BannerSave( { attributes } ) {
  const { url, id, alt, headingText } = attributes;
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
              <h2 className="alpha headline">
                <RichText.Content className="alpha headline" value={ headingText } />
              </h2>
              <div className="button__wrapper">
                <a href="/contact/" className="button button--default main-banner__button">Get in touch</a>
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
