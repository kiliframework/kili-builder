import FontStylesAttributes from '../../components/FontStyles/attributes';
import { defaultAttrBuiler } from '../utils';
import { COLORS } from '../../constants/colors';

export default {
  currentTab: {
    type: 'string',
    default: 'desktop',
  },
  text: {
    type: 'string',
    default: '',
  },
  isCreated: {
    type: 'boolean',
    default: false,
  },
  includeLines: {
    type: 'boolean',
    default: false,
  },
  linesColor: defaultAttrBuiler( 'color', '#0bd8a2'),
  linesSize: defaultAttrBuiler( null , 2),
  ...FontStylesAttributes
};
