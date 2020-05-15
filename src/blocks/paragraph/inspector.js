import { InspectorControls } from '@wordpress/block-editor';

import FontStyles from '../../components/FontStyles';
import { DeviceTabProvider } from '../../hooks/useDeviceTab';

export default function Inspector( props ) {
  return (
    <InspectorControls>
      <DeviceTabProvider>
        <FontStyles { ...props } />
      </DeviceTabProvider>
    </InspectorControls>

  );
}
