import deepmerge from 'deepmerge';
import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { initPrependUniqueClass } from '../utils/styles';
import { pick } from '../utils/object';
import { TEXT_KEYS } from '../../constants/attributesKeys';

const bannerStyles = ( { attributes } ) => {
  const { uniqueClassName } = attributes;

  const prependUniqueClass = initPrependUniqueClass( uniqueClassName );

  const bannerHeadingAttributes = pick( attributes, [ ...TEXT_KEYS ] );
  const bannerHeadingStyles = genericStylesCreator( bannerHeadingAttributes, prependUniqueClass( 'kili-banner__header' ) );

  const stylesMerged = deepmerge.all( [ bannerHeadingStyles ] );

  return stylesMerged;
};

export default bannerStyles;
