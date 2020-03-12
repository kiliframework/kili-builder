import BackgroundAttributes from '../../components/Background/BackgroundAttributes';
import DimensionAttributes from '../../components/DimensionsControl/attributes';

export default {
  columns: {
    type: 'object',
    default: {
      mobile: {
        prefix: 'sm',
        value: 12,
      },
      tablet: {
        prefix: 'md',
        value: 12,
      },
      desktop: {
        prefix: 'lg',
        value: 6,
      },
    },
  },
  currentTab: {
    type: 'string',
    default: 'desktop',
  },
  align: {
    type: 'string',
    default: '',
  },
  width: {
    type: 'string',
  },
  contentAlign: {
    type: 'string',
  },
  textColor: {
    type: 'string',
  },
  customTextColor: {
    type: 'string',
  },
  ...BackgroundAttributes,
  ...DimensionAttributes,
};
