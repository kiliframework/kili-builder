export const hasAnyProperty = ( obj, props ) => {
  for ( const prop of props ) {
    if ( obj.hasOwnProperty( prop ) ) {
      return true;
    }
  }

  return false;
};
