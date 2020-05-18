import FontStylesAttributes from '../../components/FontStyles/attributes';
import { defaultAttrBuilder } from '../utils';
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
  linesColor: defaultAttrBuilder( 'color', '#0bd8a2' ),
  linesSize: defaultAttrBuilder( null, 2 ),
  ...FontStylesAttributes,
};
