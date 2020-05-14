import deepmerge from 'deepmerge';
import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { stylesByDeviceAccumulator, setStyleByDevice, cssPropertyValueCreator, withUniqueClass, initGetValue } from '../utils/styles';
import { pick } from '../utils/object';
import { marginKeys, paddingKeys, backgroundKeys } from '../../constants/attributesKeys';
import { DEVICE_GROUP } from '../../constants';

const styles = ( { attributes } ) => {
  const { uniqueClassName } = attributes;

  const getValue = initGetValue( attributes );
  const prependUniqueClass = withUniqueClass( uniqueClassName );

  const containerAttributes = pick( attributes, [ ...marginKeys, ...paddingKeys, 'minHeight' ] );
  const containerStyles = genericStylesCreator( containerAttributes, uniqueClassName );

  const containerOverlayAttributes = pick( attributes, [ ...backgroundKeys, 'opacity' ] );
  const containerOverlayStyles = genericStylesCreator( containerOverlayAttributes, prependUniqueClass( 'kili-container__overlay' ) );

  const stylesByDevice = stylesByDeviceAccumulator();

  for ( const device of DEVICE_GROUP ) {
    const value = getValue( 'fullWidth', device ) ? 'none' : `${ getValue( 'maxWidth', device ) }`;
    if ( value ) {
      const cssValue = cssPropertyValueCreator( 'max-width', value );
      setStyleByDevice( stylesByDevice, device, uniqueClassName, cssValue );
    }
  }

  const stylesMerged = deepmerge.all( [ containerStyles, stylesByDevice, containerOverlayStyles ] );

  return stylesMerged;
};

export default styles;
