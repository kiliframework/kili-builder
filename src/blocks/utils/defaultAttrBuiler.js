import { DEVICE_GROUP, DESKTOP } from '../../constants/devicesSizes';
import { devicesAttributes } from '../utils';

// VALUE CAN BE EITHER A VALUE FOR ALL THE DEVICES || AN OBJ WITH STRUCTURE
// { mobile: value, tablet... }
export const defaultAttrBuiler = ( attrName, value ) => {
  const defaultAttr = {
    ...( attrName && { attrName } ),
  };
  const isGeneralAttr = typeof value !== 'object';
  defaultAttr[ DESKTOP ] = {
    ...devicesAttributes[ DESKTOP ],
    value,
    ...( attrName && { attrName } ),
  };

  return ( {
    type: 'object',
    default: defaultAttr,
  } );
};
