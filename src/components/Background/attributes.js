import { defaultAttrBuiler } from "../../blocks/utils";

/**
 * Set the attributes for the Background Panel
 *
 * @type {Object}
 */
const BackgroundAttributes = {
  opacity: defaultAttrBuiler('opacity', 1),
  backgroundImage: defaultAttrBuiler('background-image'),
  backgroundSize: defaultAttrBuiler('background-size', 'cover'),
  backgroundPosition: defaultAttrBuiler('background-position', 'center'),
  backgroundColor: defaultAttrBuiler('background-color'),
};

export default BackgroundAttributes;
