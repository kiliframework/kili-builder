import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { initPrependUniqueClass } from '../utils/styles';
import { pick } from '../utils/object';
import { TEXT_KEYS } from '../../constants/attributesKeys';

const headingStyles = ( { attributes } ) => {
  const { uniqueClassName } = attributes;
  const headingAttributes = pick( attributes, [ ...TEXT_KEYS ] );

  return genericStylesCreator( headingAttributes, uniqueClassName );
};

export default headingStyles;
