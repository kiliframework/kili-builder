import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel, ToggleControl, PanelBody } from '@wordpress/components';

import { attrOptionsBuiler, panelTabBuiler, valueSetter, getDeviceValue } from '../utils';
import FontStyles from '../../components/FontStyles';
import AdvancedColorControl from '../../components/AdvancedColorControl';

export default function Inspector( props ) {
  const { attributes, setAttributes } = props;
  const { currentTab, includeLines, linesColor } = attributes;

  const handleAttributeChange = ( attribute, value ) => setAttributes( { [ attribute ]: value } );

  const linesColorValue = getDeviceValue(linesColor, currentTab);  

  return (
    <InspectorControls>
      <TabPanel
        className="kt-inspect-tabs"
        activeClass="active-tab"
        initialTabName={ currentTab }
        onSelect={ ( value ) => handleAttributeChange( 'currentTab', value ) }
        tabs={ panelTabBuiler }
      >
        { () => {
          return (
            <>
              <PanelBody title={ __( 'Lines Settings', 'kili-builder' ) }>
                <ToggleControl
                  label={ __( 'Include lines', 'kili-builder' ) }
                  checked={ includeLines }
                  onChange={ ( value ) => handleAttributeChange( 'includeLines', value ) }
                />
                {includeLines && (
                  <>
                    <AdvancedColorControl
                      label={ __( 'Lines Color' ) }
                      colorValue={ ( linesColorValue ? linesColorValue : '' ) }
                      colorDefault={ linesColorValue }
                      onColorChange={ ( value ) => setAttributes( { linesColor: valueSetter( linesColor, currentTab, value ) } ) }
                    />
                  </>
                )}
              </PanelBody>
              <FontStyles {...props} />
              
            </> 
          );
        } }
      </TabPanel>
    </InspectorControls>

  );
}
