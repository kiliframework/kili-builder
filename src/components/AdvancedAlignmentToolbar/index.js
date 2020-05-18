import withAdvancedControls, { shouldControlRender } from '../../hoc/withAdvancedControls';
import { compose } from '@wordpress/compose';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { BaseControl } from '@wordpress/components';

function AdvancedAlignmentToolbar( { label, ...props } ) {
  return (
    <BaseControl label={ label } >
      <AlignmentToolbar
        { ...props }
      />
    </BaseControl>
  );
}

export default compose(
  withAdvancedControls
)( wp.element.memo( AdvancedAlignmentToolbar, shouldControlRender ) );
