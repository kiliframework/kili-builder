import deepmerge from 'deepmerge';
import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { stylesByDeviceAccumulator, setStyleByDevice, cssPropertyValueCreator, withUniqueClass } from '../utils/styles';

const styles = ( { attributes }, ) => {
  const { fullWidth, maxWidth, uniqueClassName, ...genericAttributes } = attributes;
  const genericStyles = genericStylesCreator( genericAttributes, uniqueClassName );
  const prependUniqueClass = withUniqueClass( uniqueClassName );
  console.log( prependUniqueClass( '.lol' ) );

  const stylesByDevice = stylesByDeviceAccumulator();

  for ( const device of Object.keys( maxWidth ) ) {
    const value = fullWidth[ device ].value ? 'none' : `${ maxWidth[ device ].value }`;
    if ( value ) {
      const cssValue = cssPropertyValueCreator( 'max-width', value );
      setStyleByDevice( stylesByDevice, device, uniqueClassName, cssValue );
    }
  }

  const stylesMerged = deepmerge.all( [ genericStyles, stylesByDevice ] );
  return stylesMerged;
};

export default styles;
