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
  maxWidth: {
    type: 'object',
    default: {
      mobile: {
        ...devicesAttributes.mobile,
        value: '1200',
        unit: 'px',
      },
      tablet: {
        ...devicesAttributes.tablet,
        value: '100',
        unit: '%',
      },
      desktop: {
        ...devicesAttributes.desktop,
        value: '100',
        unit: '%',
      },
    },
  },
  flexDirection: {
    type: 'object',
    default: {
      mobile: {
        ...devicesAttributes.mobile,
        value: 'row',
      },
      tablet: {
        ...devicesAttributes.tablet,
        value: 'row',
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
