import { defaultAttrBuiler } from '../utils';
import FontStylesAttributes from '../../components/FontStyles/attributes';
import { DESKTOP } from '../../constants/devicesSizes';

export default {
  headingText: {
    type: 'string',
  },
  buttonText: {
    type: 'string',
    default: 'GET IN TOUCH',
  },
  url: {
    type: 'string',
    source: 'attribute',
    selector: 'img',
    attribute: 'src',
  },
  alt: {
    type: 'string',
    source: 'attribute',
    selector: 'img',
    attribute: 'alt',
    default: '',
  },
  id: {
    type: 'string',
    source: 'attribute',
    selector: 'img',
    attribute: 'data-id',
  },
  currentTab: {
    type: 'string',
    default: DESKTOP,
  },
  isCreated: {
    type: 'boolean',
    default: false,
  },
  ...FontStylesAttributes,
};