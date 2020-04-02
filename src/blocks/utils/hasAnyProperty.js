import has from 'lodash/has';

export const hasAnyProperty = ( obj, props ) => {
  for ( const prop of props ) {
    if ( obj && has( obj, `${ prop }.attrName` ) ) {
      return true;
    }
  }

  return false;
};
