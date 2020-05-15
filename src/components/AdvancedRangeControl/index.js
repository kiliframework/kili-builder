import { RangeControl } from '@wordpress/components';
import withAdvancedControls from '../../hoc/withAdvancedControls';
import { compose } from '@wordpress/compose';

function AdvancedRangeControl( { value, ...props } ) {
  return (
    <RangeControl
      value={ parseFloat( value ) || '' }
      { ...props }
    />
  );
}

export default compose(
  withAdvancedControls
)( AdvancedRangeControl );
