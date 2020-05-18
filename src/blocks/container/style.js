import deepmerge from 'deepmerge';
import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { stylesByDeviceAccumulator, setStyleByDevice, cssPropertyValueCreator, initPrependUniqueClass, initGetValue } from '../utils/styles';
import { pick } from '../utils/object';
import { MARGIN_KEYS, PADDING_KEYS, BACKGROUND_KEYS } from '../../constants/attributesKeys';
import { DEVICE_GROUP } from '../../constants';

const styles = ( { attributes } ) => {
  const { uniqueClassName } = attributes;

  const getValue = initGetValue( attributes );
  const prependUniqueClass = initPrependUniqueClass( uniqueClassName );

  const containerAttributes = pick( attributes, [ ...MARGIN_KEYS, ...PADDING_KEYS, 'minHeight' ] );
  const containerStyles = genericStylesCreator( containerAttributes, uniqueClassName );

  const containerOverlayAttributes = pick( attributes, [ ...BACKGROUND_KEYS, 'opacity' ] );
  const containerOverlayStyles = genericStylesCreator( containerOverlayAttributes, prependUniqueClass( 'kili-container__overlay' ) );

  const stylesByDevice = stylesByDeviceAccumulator();

  for ( const device of DEVICE_GROUP ) {
    const newMaxWidth = getValue( 'fullWidth', device ) ? 'none' : `${ getValue( 'maxWidth', device ) }`;
    if ( newMaxWidth ) {
      const cssValue = cssPropertyValueCreator( 'max-width', newMaxWidth );
      setStyleByDevice( stylesByDevice, device, uniqueClassName, cssValue );
    }
    const backgroundImage = getValue( 'backgroundImage', device );
    if ( backgroundImage?.url ) {
      const cssValue = cssPropertyValueCreator( 'background-image', `url(${ backgroundImage.url })` );
      setStyleByDevice( stylesByDevice, device, prependUniqueClass( 'kili-container__overlay' ), cssValue );
    }
  }

  const stylesMerged = deepmerge.all( [ containerStyles, stylesByDevice, containerOverlayStyles ] );

  return stylesMerged;
};

export default styles;
