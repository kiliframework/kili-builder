import { defaultAttrBuiler } from '../utils';

export default {
  justifyContent: defaultAttrBuiler( 'space-between', 'justify-content' ),
  alignItems: defaultAttrBuiler( 'stretch', 'align-items' ),
  flexDirection: defaultAttrBuiler( 'row', 'flex-direction' ),
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
