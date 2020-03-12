import { defaultAttrBuiler } from '../utils';

export default {
  justifyContent: defaultAttrBuiler( 'space-between' ),
  alignItems: defaultAttrBuiler( 'stretch' ),
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
