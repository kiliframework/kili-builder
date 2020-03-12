import { attrsExtrartor } from './attrsExtrartor';

export const attrClassCreator = ( attrObj ) => {
  const attributes = attrsExtrartor( attrObj );
  let classes = '';

  for ( const attrKey in attributes ) {
    const attribute = attributes[ attrKey ];
    for ( const device in attribute ) {
      if ( attribute[ device ].value ) {
        classes += ` ${ attribute[ device ].prefix }--${ attribute[ device ].attrName }__${ attribute[ device ].value }`;
      }
    }
  }

  return classes;
};
