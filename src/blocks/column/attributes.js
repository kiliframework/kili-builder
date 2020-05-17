import BackgroundAttributes from '../../components/Background/attributes';
import DimensionAttributes from '../../components/DimensionsControl/attributes';
import { defaultAttrBuilder } from '../utils';

export default {
  columns: defaultAttrBuilder( null, 12 ),
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
