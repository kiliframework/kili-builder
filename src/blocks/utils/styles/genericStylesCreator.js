import { attrsExtrartor } from '../attrsExtrartor';
import { NORMAL, PSEUDO_CLASSES } from '../../../constants/pseudoClasses';
import { DEVICE_GROUP } from '../../../constants';
import { stylesByDeviceAccumulator } from '.';

/**
 *
 * @param {Object} attrObj Object of attributes to be iterated over
 * @param {*} selector Main class selector to append styles
 *
 * @return {Object} Object containing styles to each selector separated by device
 */
export const genericStylesCreator = ( attrObj, selector = '' ) => {
  const attributes = attrsExtrartor( attrObj ); //Extract styles only relevant CSS attributes;

  const stylesByDevice = stylesByDeviceAccumulator();

  const attributesWithNoPseudoClass = new Set();

  for ( const device of DEVICE_GROUP ) {
    for ( const pseudoClass of PSEUDO_CLASSES ) {
      for ( const attrKey in attributes ) {
        let attributeClassSelector = `.${ selector }`;
        const attribute = attributes[ attrKey ];
        // Check if device is not undefined and is not at attribute with pseudo class and value already on stylesByDevice
        if ( attribute[ device ].value && ! attributesWithNoPseudoClass.has( `${ device }${ attribute[ device ].attrName }` ) ) {
          let attributeValue = attribute[ device ].value;
          // Check if device value is a pseudo class object
          if ( typeof attributeValue === 'object' ) {
            if ( attributeValue[ pseudoClass ] ) {
              attributeValue = `${ attributeValue[ pseudoClass ] }`;
              // If pseudoClass is not NORMAl, i.e ACTIVE, HOVER, etc. Then we must append the pseudoclass to the selector.
              if ( pseudoClass !== NORMAL ) {
                attributeClassSelector = `.${ selector }:${ pseudoClass }`;
              }
            } else {
              // If there is not value, there is no reason to continue this iteration.
              continue;
            }
          } else {
            // Add current attribute to Set of attributesWithNoPseudoClass so it doesn't add duplicate styles.
            attributesWithNoPseudoClass.add( `${ device }${ attribute[ device ].attrName }` );
          }
          const cssPropertyValue = `${ attribute[ device ].attrName }:${ attributeValue };`;
          // If the current selector exists, we append the current value with new one. Otherwise, initialize array.
          stylesByDevice[ device ][ attributeClassSelector ] = stylesByDevice[ device ][ attributeClassSelector ]
            ? [ ...stylesByDevice[ device ][ attributeClassSelector ], cssPropertyValue ]
            : [ cssPropertyValue ];
        }
      }
    }
  }

  return stylesByDevice;
};

