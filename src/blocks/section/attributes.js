import { defaultAttrBuilder } from '../utils';

export default {
  justifyContent: defaultAttrBuilder( 'justify-content', 'space-between', ),
  alignItems: defaultAttrBuilder( 'align-items', 'stretch', ),
  flexDirection: defaultAttrBuilder( 'flex-direction', 'row', ),
  columns: {
    type: 'number',
    default: 1,
  },
  currentTab: {
    type: 'string',
    default: 'desktop',
  },
  isCreated: {
    type: 'boolean',
    default: false,
  },
};
