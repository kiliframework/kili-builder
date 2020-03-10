import { devicesAttributes } from '../utils/commonAttributes';

export default {
  justifyContent: {
    type: 'object',
    default: {
      mobile: {
        ...devicesAttributes.mobile,
        value: 'space-between',
      },
      tablet: {
        ...devicesAttributes.tablet,
        value: 'space-between',
      },
      desktop: {
        ...devicesAttributes.desktop,
        value: 'space-between',
      },
    },
  },
  alignItems: {
    type: 'object',
    default: {
      mobile: {
        ...devicesAttributes.mobile,
        value: 'stretch',
      },
      tablet: {
        ...devicesAttributes.tablet,
        value: 'stretch',
      },
      desktop: {
        ...devicesAttributes.desktop,
        value: 'stretch',
      },
    },
  },
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
