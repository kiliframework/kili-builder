import deepmerge from 'deepmerge';
import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { stylesByDeviceAccumulator, setStyleByDevice, cssPropertyValueCreator } from '../utils/styles';

const styles = ( { attributes } ) => {
  const { fullWidth, maxWidth, ...genericAttributes } = attributes;
  const genericStyles = genericStylesCreator( genericAttributes );

  const stylesByDevice = stylesByDeviceAccumulator();

  for ( const device of Object.keys( maxWidth ) ) {
    const value = fullWidth[ device ].value ? 'none' : `${ maxWidth[ device ].value }`;
    if ( value ) {
      const cssValue = cssPropertyValueCreator( 'max-width', value );
      setStyleByDevice( stylesByDevice, device, '.lol', cssValue );
    }
  }

  const stylesMerged = deepmerge.all( [ genericStyles, stylesByDevice ] );
  return stylesMerged;
};

export default styles;
