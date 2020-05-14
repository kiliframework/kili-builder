import { RangeControl } from '@wordpress/components';
import { useDeviceTab } from '../../hooks/useDeviceTab';
import { __ } from '@wordpress/i18n';

export default function AdvancedRangeControl( { attribute, onChange = () => {}, dimension = '', ...props } ) {
  const { name: tab } = useDeviceTab();
  console.log( { [ attribute ]: attribute } );
  const attributeName = Object.keys( { [ attribute ]: attribute } )[ 0 ];
  return (
    <RangeControl
      value={ parseFloat( attribute[ tab ]?.value ) || '' }
      onChange={ ( value ) => onChange( attributeName, tab, value, dimension ) }
      { ...props }
    />
  );
}
