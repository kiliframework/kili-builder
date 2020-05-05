import { attrsExtrartor } from './attrsExtrartor';
import { NORMAL } from '../../constants/pseudoClasses';
import { DEVICE_GROUP, DESKTOP, BREAKPOINTS_VALUES } from '../../constants';

export const saveStyleCreator = ( instanceId, attrObj ) => {
  const attributes = attrsExtrartor( attrObj );

  let styles = '';

  for ( const device of DEVICE_GROUP ) {
    let className = `.kili-${ instanceId }{`;
    if ( device !== DESKTOP ) {
      className = `@media all and (max-width: ${ BREAKPOINTS_VALUES[ device ] }){.kili-${ instanceId }{`;
    }
    styles += className;
    for ( const attrKey in attributes ) {
      const attribute = attributes[ attrKey ];
      if ( attribute[ device ].value ) {
        if ( typeof attribute[ device ].value === 'object' ) {
          for ( const pseudoClass in attribute[ device ].value ) {
            if ( pseudoClass === NORMAL && attribute[ device ].value[ pseudoClass ] ) {
              styles += `${ attribute[ device ].attrName }:${ attribute[ device ].value[ pseudoClass ] };`;
            }
          }
        } else {
          styles += `${ attribute[ device ].attrName }:${ attribute[ device ].value };`;
        }
      }
    }
    styles += '}}';
  }

  return { styles };
};
