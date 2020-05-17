import deepmerge from 'deepmerge';
import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { initPrependUniqueClass } from '../utils/styles';
import { pick } from '../utils/object';
import { TEXT_KEYS, BUTTON_KEYS } from '../../constants/attributesKeys';

const buttonStyles = ( { attributes } ) => {
  const { uniqueClassName } = attributes;

  const buttonAttributes = pick( attributes, BUTTON_KEYS );
  console.log( buttonAttributes );

  const styles = genericStylesCreator( buttonAttributes, uniqueClassName );
  console.log( styles );

  return styles;
};

export default buttonStyles;
