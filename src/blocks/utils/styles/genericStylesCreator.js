import { attrsExtrartor } from '../attrsExtrartor';
import { NORMAL, PSEUDO_CLASSES } from '../../../constants/pseudoClasses';
import { DEVICE_GROUP } from '../../../constants';

export const genericStylesCreator = ( attrObj, selector = '.lol' ) => {
  const attributes = attrsExtrartor( attrObj ); //Extract styles only relevant CSS attributes;

  const stylesByDevice = {
    desktop: {},
    tablet: {},
    mobile: {},
  };

  const attributesWithNoPseudoClass = new Set();

  for ( const device of DEVICE_GROUP ) {
    for ( const pseudoClass of PSEUDO_CLASSES ) {
      for ( const attrKey in attributes ) {
        let attributeClassSelector = selector;
        const attribute = attributes[ attrKey ];
        if ( attribute[ device ].value && ! attributesWithNoPseudoClass.has( `${ device }${ attribute[ device ].attrName }` ) ) {
          let attributeValue = attribute[ device ].value;
          // Check if device value is a pseudo class object
          if ( typeof attributeValue === 'object' ) {
            if ( attributeValue[ pseudoClass ] ) {
              attributeValue = `${ attributeValue[ pseudoClass ] }`;
              if ( pseudoClass !== NORMAL ) {
                attributeClassSelector = `${ selector }:${ pseudoClass }`;
              } // Add current attribute pseudo class style to the accumulator
            } else {
              continue;
            }
          } else {
            attributesWithNoPseudoClass.add( `${ device }${ attribute[ device ].attrName }` );
          }
          const cssPropertyValue = `${ attribute[ device ].attrName }:${ attributeValue };`;
          stylesByDevice[ device ][ attributeClassSelector ] = stylesByDevice[ device ][ attributeClassSelector ]
            ? [ ...stylesByDevice[ device ][ attributeClassSelector ], cssPropertyValue ]
            : [ cssPropertyValue ];
        }
      }
    }
  }

  return stylesByDevice;
};

