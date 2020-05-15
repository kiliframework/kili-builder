import deepmerge from 'deepmerge';
import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { stylesByDeviceAccumulator, setStyleByDevice, cssPropertyValueCreator, initPrependUniqueClass, initGetValue } from '../utils/styles';
import { pick } from '../utils/object';
import { MARGIN_KEYS, PADDING_KEYS, TEXT_KEYS } from '../../constants/attributesKeys';
import { DEVICE_GROUP } from '../../constants';

const bannerStyles = ( { attributes } ) => {
  const { uniqueClassName } = attributes;

  const prependUniqueClass = initPrependUniqueClass( uniqueClassName );

  const bannerHeadingAttributes = pick( attributes, [ ...TEXT_KEYS ] );
  const bannerHeadingStyles = genericStylesCreator( bannerHeadingAttributes, prependUniqueClass( 'kili-banner__header' ) );

  const stylesMerged = deepmerge.all( [ bannerHeadingStyles ] );

  return stylesMerged;
};

export default bannerStyles;
