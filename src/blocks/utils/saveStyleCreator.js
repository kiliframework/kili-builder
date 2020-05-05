import { attrsExtrartor } from './attrsExtrartor';
import { NORMAL, PSEUDO_CLASSES } from '../../constants/pseudoClasses';
import { DEVICE_GROUP, DESKTOP, BREAKPOINTS_VALUES } from '../../constants';

export const saveStyleCreator = ( attrObj ) => {
  const attributes = attrsExtrartor( attrObj ); //Extract styles only relevant CSS attributes;

  let styles = '';

  for ( const device of DEVICE_GROUP ) {
    let mediaQuerySelector = '';
    let attributesStylesByDevice = '';
    let hasMediaQueryProperties = false; // Flag for checking if media query selector is necessary
    if ( device !== DESKTOP ) {
      mediaQuerySelector = `@media all and (max-width: ${ BREAKPOINTS_VALUES[ device ] }){`; // Add media query selector
    }
    for ( const pseudoClass of PSEUDO_CLASSES ) {
      const pseudoClassSelector = `&:${ pseudoClass }{`; // Add pseudo class selector
      let attributesStylesByPseudoClass = '';
      let hasPseudoClassesProperties = false; // Flag for checking if pseudo class selector is necessary
      for ( const attrKey in attributes ) {
        const attribute = attributes[ attrKey ];
        if ( attribute[ device ].value ) {
          if ( typeof attribute[ device ].value === 'object' ) { // Check if device value is a pseudo class object
            if ( attribute[ device ].value[ pseudoClass ] ) {
              hasMediaQueryProperties = true;
              const pseudoClassPropertyValue = `${ attribute[ device ].attrName }:${ attribute[ device ].value[ pseudoClass ] };`;
              //  If pseudo class is normal, a pseudoClass selector is not necessary and it's added to the device styles accumulator
              if ( pseudoClass === NORMAL ) {
                attributesStylesByDevice += `${ pseudoClassPropertyValue }`;
                continue; // Since no pseudo selector is required, code below is skipped
              }
              hasPseudoClassesProperties = true;
              attributesStylesByPseudoClass += `${ pseudoClassPropertyValue }`; // Add current attribute pseudo class style to the accumulator
            }
          } else {
            hasMediaQueryProperties = true;
            attributesStylesByDevice += `${ attribute[ device ].attrName }:${ attribute[ device ].value };`; // Add current attribute style to the device accumulator
          }
        }
      }
      if ( hasPseudoClassesProperties ) {
        // Add pseudo classes with selector if there are values defined for that pseudoClass
        attributesStylesByDevice += `${ pseudoClassSelector }${ attributesStylesByPseudoClass }}`;
      }
    }

    // Add query selector only if device isn't desktop, and there are values defined for that device
    if ( device !== DESKTOP && hasMediaQueryProperties ) {
      styles += `${ mediaQuerySelector }${ attributesStylesByDevice }}`;
      continue;
    }
    styles += `${ attributesStylesByDevice }`;
  }

  return styles;
};

