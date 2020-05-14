import { RangeControl } from '@wordpress/components';
import { useDeviceTab } from '../../hooks/useDeviceTab';
import { __ } from '@wordpress/i18n';
import { useClientID } from '../../hooks/useClientID';
import useAttributeSetter from '../../hooks/useAttributeSetter';
import { useSelect } from '@wordpress/data';

export default function AdvancedRangeControl( { attributeName, dimension = '', ...props } ) {
  const { name: tab } = useDeviceTab();
  const clientID = useClientID();
  const { handleAttributesWithDeviceChange } = useAttributeSetter( clientID );
  const currentBlockAttributes = useSelect(
    ( select ) => select( 'core/block-editor' ).getBlockAttributes( clientID )
  );

  return (
    <RangeControl
      value={ parseFloat( currentBlockAttributes[ attributeName ][ tab ]?.value ) || '' }
      onChange={ ( value ) => handleAttributesWithDeviceChange( attributeName, tab, value, dimension ) }
      { ...props }
    />
  );
}
