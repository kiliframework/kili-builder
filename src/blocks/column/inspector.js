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
    currentTab,
    marginSize,
    paddingSize,
  } = attributes;

  const onChangeWidth = ( newWidth ) => {
    setAttributes( { columns: {
      ...attributes.columns,
      [ currentTab ]: {
        ...attributes.columns[ currentTab ],
        value: newWidth,
      },
    } } );
  };

  const onTabSelect = ( tabName ) => {
    setAttributes( { currentTab: tabName } );
  };

  const getValuesByDevice = ( type ) => {
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
        initialTabName={ currentTab }
        onSelect={ onTabSelect }
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
                  { ...getValuesByDevice( 'padding' ) }
                  dimensionSize={ paddingSize }
                />
                <DimensionsControl
                  { ...props }
                  device={ tab.name }
                  type={ 'margin' }
                  label={ __( 'Margin', 'kili-builder' ) }
                  help={ __( 'Space around the container.', 'kili-builder' ) }
                  { ...getValuesByDevice( 'margin' ) }
                  dimensionSize={ marginSize }
                />
                <RangeControl
                  label={ __( 'Width (number of columns)', 'kili-builder' ) }
                  value={ Number( columns[ currentTab ].value ) }
                  onChange={ ( newWidth ) => onChangeWidth( Number( newWidth ) ) }
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
