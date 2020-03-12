import { devicesAttributes } from '../utils/commonAttributes';

export default {
  maxWidth: {
    type: 'object',
    default: {
      desktop: {
        ...devicesAttributes.desktop,
        value: 1200,
      },
    },
  },
  minHeight: {
    type: 'object',
    default: {
      desktop: {
        ...devicesAttributes.desktop,
        value: 100,
      },
    },
  },
};
