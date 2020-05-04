import backgroundAttributes from '../../components/Background/attributes';
import { defaultAttrBuiler } from '../utils';

export default {
  width: defaultAttrBuiler( 'width', 'auto' ),
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
};
