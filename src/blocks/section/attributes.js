import { defaultAttrBuiler } from '../utils/defaultAttrBuiler';

export default {
  justifyContent: defaultAttrBuiler( 'space-between' ),
  alignItems: defaultAttrBuiler( 'stretch' ),
  flexDirection: defaultAttrBuiler( 'row' ),
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
