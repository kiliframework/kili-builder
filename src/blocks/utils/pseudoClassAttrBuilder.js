import { PSEUDO_CLASSES } from '../../constants/pseudoClasses';

export const pseudoClassAttrBuilder = ( attrName, value ) => {
  const pseudoClassesAttrs = {};

  PSEUDO_CLASSES.forEach( ( pseudoClass ) => {
    const isGeneralAttr = typeof value !== 'object';
    pseudoClassesAttrs[ pseudoClass ] = {
      value: isGeneralAttr ? value : value[ pseudoClass ],
      ...( attrName && { attrName } ),
    };
  } );

  return ( {
    type: 'object',
    default: pseudoClassesAttrs,
  } );
};
