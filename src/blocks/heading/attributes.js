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
    source: 'html',
    selector: 'h1,h2,h3,h4,h5,h6',
  },
  isCreated: {
    type: 'boolean',
    default: false,
  },
  includeLines: {
    type: 'boolean',
    default: false,
  },
  linesColor: defaultAttrBuiler( 'color', '#0bd8a2' ),
  linesSize: defaultAttrBuiler( null, 2 ),
  ...FontStylesAttributes,
};
