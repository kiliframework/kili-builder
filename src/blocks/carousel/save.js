/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { DESKTOP, TABLET, MOBILE } from '../../constants';

export default function save( { attributes } ) {
  const {
    images,
    slidesToShow,
    slidesToScroll,
    dots,
    arrows,
    infinite,
  } = attributes;

  return (
    <div
    >
      <div>
        <div
          className="kili-blocks-carousel-init"
          data-columns-desktop={ slidesToShow[ DESKTOP ].value }
          data-columns-tablet={ slidesToShow[ TABLET ].value }
          data-columns-mobile={ slidesToShow[ MOBILE ].value }
          data-scroll-desktop={ slidesToScroll[ DESKTOP ].value }
          data-scroll-tablet={ slidesToScroll[ TABLET ].value }
          data-scroll-mobile={ slidesToScroll[ MOBILE ].value }
        >
          { images.map( ( image, index ) => (
            <div className="kb-slide-item kb-gallery-carousel-item" key={ index }>
              <figure>
                <img
                  src={ image.url }
                  alt={ image.alt }
                  data-id={ image.id }
                  data-full-url={ image.fullUrl }
                  data-link={ image.link }
                  className={
                    image.id ? `wp-image-${ image.id }` : null
                  }
                />
                { ! RichText.isEmpty( image.caption ) && (
                  <RichText.Content
                    tagName="figcaption"
                    className="kili-carousel-slide__caption"
                    value={ image.caption }
                  />
                ) }
                { ! RichText.isEmpty( image.author ) && (
                  <RichText.Content
                    tagName="figcaption"
                    className="kili-carousel-slide__author"
                    value={ image.author }
                  />
                ) }
                { ! RichText.isEmpty( image.title ) && (
                  <RichText.Content
                    tagName="figcaption"
                    className="kili-carousel-slide__title"
                    value={ image.title }
                  />
                ) }
              </figure>
            </div>
          ) ) }
        </div>
      </div>
    </div>

  );
}
