import FontStylesAttributes from '../../components/FontStyles/attributes';

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
  ...FontStylesAttributes
};
