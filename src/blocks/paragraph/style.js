import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { pick } from '../utils/object';
import { TEXT_KEYS } from '../../constants/attributesKeys';

const paragraphStyles = ( { attributes } ) => {
  const { uniqueClassName } = attributes;
  const paragraphAttributes = pick( attributes, [ ...TEXT_KEYS ] );

  return genericStylesCreator( paragraphAttributes, uniqueClassName );
};

export default paragraphStyles;
