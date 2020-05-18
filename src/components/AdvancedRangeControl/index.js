import { RangeControl } from '@wordpress/components';
import withAdvancedControls, { shouldControlRender } from '../../hoc/withAdvancedControls';
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
)( wp.element.memo( AdvancedRangeControl, shouldControlRender ) );
