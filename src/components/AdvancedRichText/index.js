import { RichText } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import withAdvancedControls from '../../hoc/withAdvancedControls';

function AdvancedRichText( props ) {
  return (
    <RichText
      { ...props }
    />
  );
}

export default compose( withAdvancedControls )( AdvancedRichText );
