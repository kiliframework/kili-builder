import { ColorPalette, BaseControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import withAdvancedControls from '../../hoc/withAdvancedControls';

function AdvancedColorPalette( { label, value, ...props } ) {
  return (
    <BaseControl label={ label } id="colorPalette" >
      <ColorPalette
        value={ value }
        { ...props }
      />
    </BaseControl>
  );
}

export default compose(
  withAdvancedControls
)( AdvancedColorPalette );
