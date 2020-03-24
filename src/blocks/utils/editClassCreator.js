import { attrsExtrartor } from './attrsExtrartor';

export const editClassCreator = ( allAttributes ) => {
  const attributes = attrsExtrartor( allAttributes );
  const style = {};

  for ( const key in attributes ) {
    const attribute = attributes[ key ];
    if ( attribute.desktop && attribute.desktop.value ) {
      style[ key ] = attribute.desktop.value;
    }
  }

  return style;
};
