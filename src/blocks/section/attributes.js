import { defaultAttrBuiler } from '../utils';

export default {
  justifyContent: defaultAttrBuiler( 'justify-content', 'space-between',  ),
  alignItems: defaultAttrBuiler( 'align-items', 'stretch',  ),
  flexDirection: defaultAttrBuiler( 'flex-direction', 'row',  ),
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
