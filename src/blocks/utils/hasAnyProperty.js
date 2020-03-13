import { has } from 'lodash';

export const hasAnyProperty = ( obj, props ) => {
  for ( const prop of props ) {
    if ( obj && has( obj, `${ prop }.attrName` ) ) {
      return true;
    }
  }

  return false;
};
