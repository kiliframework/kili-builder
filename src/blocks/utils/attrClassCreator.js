import { attrsExtrartor } from './attrsExtrartor';
import { NORMAL } from '../../constants/pseudoClasses';

export const attrClassCreator = ( attrObj ) => {
  const attributes = attrsExtrartor( attrObj );

  let classes = '';

  for ( const attrKey in attributes ) {
    const attribute = attributes[ attrKey ];
    for ( const device in attribute ) {
      if ( attribute[ device ].value ) {
        if ( typeof attribute[ device ].value === 'object' ) {
          for ( const pseudoClass in attribute[ device ].value ) {
            if ( pseudoClass === NORMAL && attribute[ device ].value[ pseudoClass ] ) {
              classes += ` ${ attribute[ device ].prefix }--${ attribute[ device ].attrName }__${ attribute[ device ].value[ pseudoClass ] }`;
            }
          }
        } else {
          classes += ` ${ attribute[ device ].prefix }--${ attribute[ device ].attrName }__${ attribute[ device ].value }`;
        }
      }
    }
  }

  return classes;
};
