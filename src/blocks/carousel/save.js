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
            <div key={ image.url }>
              <div className="industries-carousel__item">
                <img
                  className="icon"
                  src={ image.url }
                  alt={ image.alt }
                  data-id={ image.id }
                  tabIndex="0"
                />
                { image.caption && <RichText.Content
                  tagName="caption"
                  className="item-title"
                  value={ image.caption }
                /> }
              </div>
            </div>
          ) ) }
        </div>
      </div>
    </div>

  );
}
