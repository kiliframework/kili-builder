import { SelectControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import withAdvancedControls, { shouldControlRender } from '../../hoc/withAdvancedControls';

function AdvancedSelectControl( { ...props } ) {
  return (
    <SelectControl
      className={ 'components-font-size-picker__select' }
      { ...props }
    />
  );
}

export default compose(
  withAdvancedControls
)( wp.element.memo( AdvancedSelectControl, shouldControlRender ) );
