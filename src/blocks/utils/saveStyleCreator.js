import { attrsExtrartor } from './attrsExtrartor';
import { NORMAL, PSEUDO_CLASSES } from '../../constants/pseudoClasses';
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
    for ( const pseudoClass of PSEUDO_CLASSES ) {
      const pseudoClassSelector = `&:${ pseudoClass }{`;
      let attributesStylesByPseudoClass = '';
      let hasPseudoClassesProperties = false;
      for ( const attrKey in attributes ) {
        const attribute = attributes[ attrKey ];
        if ( attribute[ device ].value ) {
          if ( typeof attribute[ device ].value === 'object' ) {
            if ( attribute[ device ].value[ pseudoClass ] ) {
              hasMediaQueryProperties = true;
              const pseudoClassPropertyValue = `${ attribute[ device ].attrName }:${ attribute[ device ].value[ pseudoClass ] };`;
              console.log( 'pseudoClass', pseudoClass );
              console.log( 'pseudoClassPropertyValue', pseudoClassPropertyValue );

              if ( pseudoClass === NORMAL ) {
                attributesStylesByDevice += `${ pseudoClassPropertyValue }`;
                continue;
              }
              hasPseudoClassesProperties = true;
              attributesStylesByPseudoClass += `${ pseudoClassPropertyValue }`;
            }
          } else {
            hasMediaQueryProperties = true;
            attributesStylesByDevice += `${ attribute[ device ].attrName }:${ attribute[ device ].value };`;
          }
        }
      }
      if ( hasPseudoClassesProperties ) {
        attributesStylesByDevice += `${ pseudoClassSelector }${ attributesStylesByPseudoClass }}`;
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

