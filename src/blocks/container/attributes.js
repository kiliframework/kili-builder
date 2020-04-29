import backgroundAttributes from '../../components/Background/attributes';
import dimensionAttributes from '../../components/DimensionsControl/attributes';
import { defaultAttrBuiler } from '../utils';

export default {
  fullWidth: defaultAttrBuiler( null, false ),
  maxWidth: defaultAttrBuiler( 'max-width', '1200px' ),
  minHeight: defaultAttrBuiler( 'minHeight' ),
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
