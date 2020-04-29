import FontStylesAttributes from '../../components/FontStyles/attributes';

export default {
  currentTab: {
    type: 'string',
    default: 'desktop',
  },
  text: {
    type: 'string',
    source: 'html',
    selector: 'p',
  },
  isCreated: {
    type: 'boolean',
    default: false,
  },
  ...FontStylesAttributes,
};
