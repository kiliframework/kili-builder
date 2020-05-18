import { defaultAttrBuilder } from '../../blocks/utils';

/**
 * Set the attributes for the Background Panel
 *
 * @type {Object}
 */
const BackgroundAttributes = {
  opacity: defaultAttrBuilder( 'opacity', 1 ),
  backgroundImage: defaultAttrBuilder( 'background-image' ),
  backgroundSize: defaultAttrBuilder( 'background-size', 'cover' ),
  backgroundPosition: defaultAttrBuilder( 'background-position', 'center' ),
  backgroundColor: defaultAttrBuilder( 'background-color' ),
};

export default BackgroundAttributes;
