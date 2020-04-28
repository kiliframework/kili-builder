import { hasAnyProperty } from './hasAnyProperty';
import { DEVICE_GROUP } from '../../constants/devicesSizes';
import { PSEUDO_CLASSES } from '../../constants/pseudoClasses';

export const attrsExtrartor = ( attrObj ) => {
  const attrs = {};
  for ( const key in attrObj ) {
    if ( hasAnyProperty( attrObj[ key ], [ ...DEVICE_GROUP, ...PSEUDO_CLASSES ] ) ) {
      attrs[ key ] = attrObj[ key ];
    }
  }

  return attrs;
};
