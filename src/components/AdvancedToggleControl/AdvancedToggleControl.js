import { ToggleControl } from '@wordpress/components';
import { useDeviceTab } from '../../hooks/useDeviceTab';
import { useClientID } from '../../hooks/useClientID';
import useAttributeSetter from '../../hooks/useAttributeSetter';
import { useSelect } from '@wordpress/data';

export default function AdvancedToggleControl( { attributeName, dimension = '', ...props } ) {
  const { name: tab } = useDeviceTab();
  const clientID = useClientID();
  const { handleAttributesWithDeviceChange } = useAttributeSetter( clientID );
  const currentBlockAttributes = useSelect(
    ( select ) => select( 'core/block-editor' ).getBlockAttributes( clientID )
  );

  return (
    <ToggleControl
      checked={ currentBlockAttributes[ attributeName ][ tab ]?.value }
      onChange={ ( value ) => handleAttributesWithDeviceChange( attributeName, tab, value, dimension ) }
      { ...props }
    />
  );
}
