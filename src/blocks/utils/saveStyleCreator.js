import { attrsExtrartor } from './attrsExtrartor';
import { NORMAL } from '../../constants/pseudoClasses';
import { DEVICE_GROUP, DESKTOP, BREAKPOINTS_VALUES } from '../../constants';

export const saveStyleCreator = ( attrObj ) => {
  const attributes = attrsExtrartor( attrObj );

  let styles = '';

  for ( const device of DEVICE_GROUP ) {
    let mediaQuery = '';
    let attributesStylesByDevice = '';
    let hasMediaQueryProperties = false;

    if ( device !== DESKTOP ) {
      mediaQuery = `@media all and (max-width: ${ BREAKPOINTS_VALUES[ device ] }){`;
    }

    for ( const attrKey in attributes ) {
      const attribute = attributes[ attrKey ];
      if ( attribute[ device ].value ) {
        if ( typeof attribute[ device ].value === 'object' ) {
          for ( const pseudoClass in attribute[ device ].value ) {
            if ( pseudoClass === NORMAL && attribute[ device ].value[ pseudoClass ] ) {
              hasMediaQueryProperties = true;
              attributesStylesByDevice += `${ attribute[ device ].attrName }:${ attribute[ device ].value[ pseudoClass ] };`;
            }
          }
        } else {
          hasMediaQueryProperties = true;
          attributesStylesByDevice += `${ attribute[ device ].attrName }:${ attribute[ device ].value };`;
        }
      }
    }

    if ( device !== DESKTOP && hasMediaQueryProperties ) {
      styles += `${ mediaQuery }${ attributesStylesByDevice }}`;
      continue;
    }
    styles += `${ attributesStylesByDevice }`;
  }

  return styles;
};

