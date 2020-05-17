import { ColorPalette, BaseControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import withAdvancedControls from '../../hoc/withAdvancedControls';
import { COLORS } from '../../constants';

function AdvancedColorPalette( { label, value, ...props } ) {
  return (
    <BaseControl label={ label }>
      <ColorPalette
        colors={ COLORS }
        { ...props }
      />
    </BaseControl>
  );
}

export default compose(
  withAdvancedControls
)( AdvancedColorPalette );
