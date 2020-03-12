import { hasAnyProperty } from './hasAnyProperty';
import { DEVICE_GROUP } from '../../constants/devicesSizes';

export const attrsExtrartor = ( attrObj ) => {
  const attrs = {};
  for ( const key in attrObj ) {
    if ( hasAnyProperty( attrObj[ key ], DEVICE_GROUP ) ) {
      attrs[ key ] = attrObj[ key ];
    }
  }

  return attrs;
};
