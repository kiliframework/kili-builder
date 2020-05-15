import { createHigherOrderComponent } from '@wordpress/compose';
import { useDeviceTab } from '../hooks/useDeviceTab';
import { useClientID } from '../hooks/useClientID';
import useBlockAttributes from '../hooks/useBlockAttributes';
import { useSelect } from '@wordpress/data';
/**
 *
 * @return {Function} Add editor and block attributes to base Gutenberg controls as props
 *  */
const withAdvancedControls = createHigherOrderComponent(
  ( WrappedComponent ) => ( props ) => {
    const { name: tab } = useDeviceTab();
    const clientID = useClientID();
    const { handleAttributesWithDeviceChange } = useBlockAttributes( clientID );
    const currentBlockAttributes = useSelect(
      ( select ) => select( 'core/block-editor' ).getBlockAttributes( clientID )
    );
    return (
      <WrappedComponent
        { ...props }
        tab={ tab }
        value={ currentBlockAttributes[ props.attributeName ][ tab ]?.value }
        onChange={ ( value ) => handleAttributesWithDeviceChange( props.attributeName, tab, value, props.dimension ) }
      />
    );
  },
  'withAdvancedControls'
);

export default withAdvancedControls
;
