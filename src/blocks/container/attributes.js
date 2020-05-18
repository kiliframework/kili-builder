import backgroundAttributes from '../../components/Background/attributes';
import dimensionAttributes from '../../components/DimensionsControl/attributes';
import { defaultAttrBuilder } from '../utils';

export default {
  fullWidth: defaultAttrBuilder( null, false ),
  maxWidth: defaultAttrBuilder( 'max-width', '1200px' ),
  minHeight: defaultAttrBuilder( 'min-height' ),
  id: {
    type: 'string',
    default: '',
  },
  url: {
    type: 'string',
    default: '',
  },
  alt: {
    type: 'string',
    default: '',
  },
  ...backgroundAttributes,
  ...dimensionAttributes,
};
