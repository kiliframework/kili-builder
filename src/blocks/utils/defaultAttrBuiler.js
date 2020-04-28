import { DEVICE_GROUP } from '../../constants/devicesSizes';
import { devicesAttributes } from '../utils';

// VALUE CAN BE EITHER A VALUE FOR ALL THE DEVICES || AN OBJ WITH STRUCTURE
// { mobile: value, tablet... }
export const defaultAttrBuiler = ( attrName, value ) => {
  const deviceAttrs = {};

  DEVICE_GROUP.forEach( ( device ) => {
    const isGeneralAttr = typeof value !== 'object';
    deviceAttrs[ device ] = {
      ...devicesAttributes[ device ],
      value,
      ...( attrName && { attrName } ),
    };
  } );
  return ( {
    type: 'object',
    default: deviceAttrs,
  } );
};
