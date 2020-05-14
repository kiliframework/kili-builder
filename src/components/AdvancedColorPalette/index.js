import { ToggleControl, ColorPalette, BaseControl } from '@wordpress/components';
import { useDeviceTab } from '../../hooks/useDeviceTab';
import { useClientID } from '../../hooks/useClientID';
import useAttributeSetter from '../../hooks/useAttributeSetter';
import { useSelect } from '@wordpress/data';

export default function AdvancedColorPalette( { attributeName, dimension = '', label, ...props } ) {
  const { name: tab } = useDeviceTab();
  const clientID = useClientID();
  const { handleAttributesWithDeviceChange } = useAttributeSetter( clientID );
  const currentBlockAttributes = useSelect(
    ( select ) => select( 'core/block-editor' ).getBlockAttributes( clientID )
  );

  return (
    <BaseControl label={ label } >
      <ColorPalette
        value={ currentBlockAttributes[ attributeName ][ tab ]?.value }
        onChange={ ( value ) => handleAttributesWithDeviceChange( attributeName, tab, value, dimension ) }
        { ...props }
      /></BaseControl>
  );
}
