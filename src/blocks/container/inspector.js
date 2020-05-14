import { InspectorControls } from '@wordpress/block-editor';
import DevicesTabs from '../../components/DevicesTabs';
import { RangeControl, PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BackgroundControl from '../../components/Background';
import DimensionsControl from '../../components/DimensionsControl';
import useAttributeSetter from '../../hooks/useAttributeSetter';
import { DeviceTabProvider } from '../../hooks/useDeviceTab';
import AdvancedRangeControl from '../../components/AdvancedRangeControl';

const { useCallback } = wp.element;

export default function Inspector( props ) {
  const { attributes, setAttributes, clientId } = props;
  const { maxWidth, minHeight, fullWidth } = attributes;
  const { handleAttributesWithDeviceChange } = useAttributeSetter( clientId );
  console.log( attributes.maxWidth );

  return (
    <InspectorControls>
      <DeviceTabProvider>
        { ( tab ) => (
          <PanelBody initialOpen title="Dimensions Settings">
            <AdvancedRangeControl
              disabled={ fullWidth[ tab ]?.value }
              label={ __( 'Max Width (pixels)', 'kili-builder' ) }
              attribute={ maxWidth }
              onChange={ handleAttributesWithDeviceChange }
              dimension="px"
              min={ 1 }
              max={ 2000 }
              step={ 1 }
            />
          </PanelBody>
        ) }

      </DeviceTabProvider>

    </InspectorControls>
  );
}
