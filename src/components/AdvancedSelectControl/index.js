import { SelectControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import withAdvancedControls from '../../hoc/withAdvancedControls';

function AdvancedSelectControl( { value, ...props } ) {
  return (
    <SelectControl
      className={ 'components-font-size-picker__select' }
      value={ value }
      { ...props }
    />
  );
}

export default compose(
  withAdvancedControls
)( AdvancedSelectControl );
