import applyWithColors from './colors';
import DimensionsControl from '../../components/DimensionsControl';

import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TabPanel, Icon } from '@wordpress/components';
import DevicesTabs from '../../components/DevicesTabs';

function Inspector( props ) {

  const { attributes,
    setAttributes } = props;
  const {
    columns,
    marginSize,
    paddingSize,
  } = attributes;

  const handleWidthChange = ( newWidth, currentTab ) => {
    setAttributes( { columns: {
      ...attributes.columns,
      [ currentTab ]: {
        ...attributes.columns[ currentTab ],
        value: newWidth,
      },
    } } );
  };

  const getValuesByDevice = ( type, currentTab ) => {
    let values = {};
    values = {
      valueTop: attributes[ type ][ currentTab ].directions.top,
      valueBottom: attributes[ type ][ currentTab ].directions.bottom,
      valueRight: attributes[ type ][ currentTab ].directions.right,
      valueLeft: attributes[ type ][ currentTab ].directions.left,
    };

    return values;
  };

  return (
    <InspectorControls>
      <DevicesTabs
      >
        { ( tab ) => {
          return (
            <>
              <PanelBody title={ __( 'Column Settings', 'kili-builder' ) } className="components-panel__body--column-settings">
                <DimensionsControl
                  { ...props }
                  device={ tab.name }
                  type={ 'padding' }
                  label={ __( 'Padding', 'kili-builder' ) }
                  help={ __( 'Space inside of the container.', 'kili-builder' ) }
                  { ...getValuesByDevice( 'padding', tab.name ) }
                  dimensionSize={ paddingSize }
                />
                <DimensionsControl
                  { ...props }
                  device={ tab.name }
                  type={ 'margin' }
                  label={ __( 'Margin', 'kili-builder' ) }
                  help={ __( 'Space around the container.', 'kili-builder' ) }
                  { ...getValuesByDevice( 'margin', tab.name ) }
                  dimensionSize={ marginSize }
                />
                <RangeControl
                  label={ __( 'Width (number of columns)', 'kili-builder' ) }
                  value={ Number( columns[ tab.name ].value ) }
                  onChange={ ( newWidth ) => handleWidthChange( Number( newWidth ), tab.name ) }
                  min={ 1 }
                  max={ 12 }
                  step={ 1 }
                />
              </PanelBody>
            </> );
        } }
      </DevicesTabs>
    </InspectorControls>

  );
}

export default applyWithColors( Inspector );
