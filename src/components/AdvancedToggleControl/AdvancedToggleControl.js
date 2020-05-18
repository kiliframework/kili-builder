import { ToggleControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import withAdvancedControls, { shouldControlRender } from '../../hoc/withAdvancedControls';

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
)( wp.element.memo( AdvancedToggleControl, shouldControlRender ) );
