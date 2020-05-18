import { DEVICE_GROUP, DESKTOP } from '../../constants/devicesSizes';
import { devicesAttributes } from '.';

// VALUE CAN BE EITHER A VALUE FOR ALL THE DEVICES || AN OBJ WITH STRUCTURE
// { mobile: value, tablet... }
export const defaultAttrBuilder = ( attrName, value ) => {
  const defaultAttr = {
    ...( attrName && { attrName } ),
  };

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
