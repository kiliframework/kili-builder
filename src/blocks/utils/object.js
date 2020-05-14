export function pick( object, keys ) {
  return keys.reduce( ( obj, key ) => {
    if ( object && object.hasOwnProperty( key ) ) {
      obj[ key ] = object[ key ];
    }
    return obj;
  }, {} );
}

export function isEmpty( obj ) {
  return Object.keys( obj ).length === 0;
}
