/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
  const {
    images,
  } = attributes;

  return (
    <figure
    >
      <ul className="blocks-gallery-grid">
        { images.map( ( image ) => {
          const img = (
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
          );

          return (
            <li
              key={ image.id || image.url }
              className="kili-carousel-slide"
            >
              <figure>
                { img }
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
            </li>
          );
        } ) }
      </ul>
    </figure>
  );
}
