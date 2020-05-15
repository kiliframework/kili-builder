import { ToggleControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import withAdvancedControls from '../../hoc/withAdvancedControls';

function AdvancedToggleControl( { value, ...props } ) {
  return (
    <ToggleControl
      checked={ !! value }
      { ...props }
    />
  );
}

export default compose(
  withAdvancedControls
)( AdvancedToggleControl );
