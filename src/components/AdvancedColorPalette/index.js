import { ColorPalette, BaseControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import withAdvancedControls, { shouldControlRender } from '../../hoc/withAdvancedControls';
import { COLORS } from '../../constants';

function AdvancedColorPalette( { label, ...props } ) {
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
)( wp.element.memo( AdvancedColorPalette, shouldControlRender ) );
