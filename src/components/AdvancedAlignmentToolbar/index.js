import withAdvancedControls from '../../hoc/withAdvancedControls';
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
)( AdvancedAlignmentToolbar );
