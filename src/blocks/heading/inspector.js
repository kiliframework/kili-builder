import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel, ToggleControl, PanelBody, RangeControl } from '@wordpress/components';

import FontStyles from '../../components/FontStyles';
import { DeviceTabProvider } from '../../hooks/useDeviceTab';
import AdvancedRangeControl from '../../components/AdvancedRangeControl';
import AdvancedColorPalette from '../../components/AdvancedColorPalette';
import { COLORS } from '../../constants';

export default function Inspector( props ) {
  const { attributes, setAttributes } = props;
  const { includeLines } = attributes;

  const handleAttributeChange = ( attribute, value ) => setAttributes( { [ attribute ]: value } );

  return (
    <InspectorControls>
      <DeviceTabProvider>
        <>
          <PanelBody title={ __( 'Lines Settings', 'kili-builder' ) }>
            <ToggleControl
              label={ __( 'Include lines', 'kili-builder' ) }
              checked={ includeLines }
              onChange={ ( value ) => handleAttributeChange( 'includeLines', value ) }
            />
            { includeLines && (
              <>
                <AdvancedColorPalette
                  label={ __( 'Lines Color', 'kili-builder' ) }
                  attributeName="linesColor"
                  colors={ COLORS }
                />
                <AdvancedRangeControl
                  label={ __( 'Lines Size', 'kili-builder' ) }
                  min={ 1 }
                  max={ 50 }
                  step={ 1 }
                />
              </>
            ) }
          </PanelBody>
          <FontStyles { ...props } isHeading />
        </>
      </DeviceTabProvider>
    </InspectorControls>

  );
}
