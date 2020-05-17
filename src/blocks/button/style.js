import deepmerge from 'deepmerge';
import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { initPrependUniqueClass } from '../utils/styles';
import { pick } from '../utils/object';
import { TEXT_KEYS, BUTTON_KEYS } from '../../constants/attributesKeys';

const buttonStyles = ( { attributes } ) => {
  const { uniqueClassName } = attributes;

  const buttonAttributes = pick( attributes, BUTTON_KEYS );
  const styles = genericStylesCreator( buttonAttributes, uniqueClassName );

  return styles;
};

export default buttonStyles;
