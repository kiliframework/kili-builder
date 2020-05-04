import { PSEUDO_CLASSES } from '../../constants/pseudoClasses';

export const pseudoClassAttrBuilder = ( value ) => {
  const pseudoClassesAttrs = {};

  PSEUDO_CLASSES.forEach( ( pseudoClass ) => {
    const isGeneralAttr = typeof value !== 'object';
    pseudoClassesAttrs[ pseudoClass ] = isGeneralAttr ? value : value[ pseudoClass ];
  } );

  return ( { ...pseudoClassesAttrs } );
};
