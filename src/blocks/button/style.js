import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { pick } from '../utils/object';
import { BUTTON_KEYS } from '../../constants/attributesKeys';

const buttonStyles = ( { attributes } ) => {
  const { uniqueClassName } = attributes;

  const buttonAttributes = pick( attributes, BUTTON_KEYS );
  const styles = genericStylesCreator( buttonAttributes, uniqueClassName );

  return styles;
};

export default buttonStyles;
