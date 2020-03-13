import BackgroundAttributes from '../../components/Background/attributes';
import DimensionAttributes from '../../components/DimensionsControl/attributes';
import { defaultAttrBuiler } from '../utils';

export default {
  columns: defaultAttrBuiler(null, 12),
  currentTab: {
    type: 'string',
    default: 'desktop',
  },
  align: {
    type: 'string',
    default: '',
  },
  ...BackgroundAttributes,
  ...DimensionAttributes,
};
