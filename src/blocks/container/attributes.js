import backgroundAttributes from '../../components/Background/attributes';
import { defaultAttrBuiler } from '../utils';

export default {
  maxWidth: defaultAttrBuiler('max-width', 1200),
  minHeight: defaultAttrBuiler('minHeight'),
  fullWidth: {
    type: 'boolean',
    default: false,
  },
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
  ...backgroundAttributes
};
