import { InspectorControls } from '@wordpress/block-editor';
import DevicesTabs from '../../components/DevicesTabs';
import { RangeControl, PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BackgroundControl from '../../components/Background';
import DimensionsControl from '../../components/DimensionsControl';
import useAttributeSetter from '../../hooks/useAttributeSetter';
import { DeviceTabProvider } from '../../hooks/useDeviceTab';
import AdvancedRangeControl from '../../components/AdvancedRangeControl';
import AdvancedToggleControl from '../../components/AdvancedToggleControl/AdvancedToggleControl';

const { useCallback } = wp.element;

export default function Inspector( props ) {
  const { attributes } = props;
  const { fullWidth } = attributes;

  return (
    <InspectorControls>
      <DeviceTabProvider>
        { ( { name: tab } ) => (
          <>
            <PanelBody initialOpen title="Dimensions Settings">
              <AdvancedToggleControl
                attributeName="fullWidth"
                label={ __( 'Full Width', 'kili-builder' ) }
              />
              <AdvancedRangeControl
                disabled={ fullWidth[ tab ]?.value }
                label={ __( 'Max Width (pixels)', 'kili-builder' ) }
                attributeName="maxWidth"
                dimension="px"
                min={ 1 }
                max={ 2000 }
                step={ 1 }
              />
              <AdvancedRangeControl
                label={ __( 'Min Height (pixels)', 'kili-builder' ) }
                attributeName="minHeight"
                dimension="px"
                min={ 1 }
                max={ 2000 }
                step={ 1 }
              />
            </PanelBody>
            <PanelBody initialOpen title="Spacing Settings">
              <DimensionsControl
                { ...props }
                device={ tab }
                type="padding"
                label={ __( 'Padding', 'kili-builder' ) }
                help={ __( 'Space inside block', 'kili-builder' ) }
              />
              <DimensionsControl
                { ...props }
                device={ tab }
                type="margin"
                label={ __( 'Margin', 'kili-builder' ) }
                help={ __( 'Space outside block', 'kili-builder' ) }
              />
            </PanelBody>
            <BackgroundControl { ...props } device={ tab } />
          </>
        ) }
      </DeviceTabProvider>
    </InspectorControls>
  );
}
