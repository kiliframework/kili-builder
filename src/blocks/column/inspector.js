import applyWithColors from './colors';
import DimensionsControl from '../../components/DimensionsControl';

import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, withFallbackStyles, TabPanel, Icon } from '@wordpress/components';

function Inspector(props) {
  const { clientId,
    attributes,
    setAttributes,
    lastId, } = props;
  const {
    columns,
    currentTab,
    marginSize,
    paddingSize,
  } = attributes;

  const onChangeWidth = ( newWidth ) => {
    setAttributes( { columns: {
      ...attributes.columns,
      [currentTab]: {
        ...attributes.columns[currentTab],
        value: newWidth,
      }
    }} );
  };

  const onTabSelect = ( tabName ) => {
    setAttributes( { currentTab: tabName } );
  };

  const getValuesByDevice = ( type ) => {
    let values = {};
    values = {
      valueTop: attributes[type][currentTab].directions.top,
      valueBottom: attributes[type][currentTab].directions.bottom,
      valueRight: attributes[type][currentTab].directions.right,
      valueLeft: attributes[type][currentTab].directions.left,
    };

    return values;
  };

  return (
    <InspectorControls>
      <TabPanel
        className="kt-inspect-tabs"
        activeClass="active-tab"
        initialTabName={ currentTab }
        onSelect={ onTabSelect }
        tabs={ [
          {
            name: 'desktop',
            title: <Icon icon="desktop" />,
            className: '',
          },
          {
            name: 'tablet',
            title: <Icon icon="tablet" />,
            className: '',
          },
          {
            name: 'mobile',
            title: <Icon icon="smartphone" />,
            className: '',
          },
        ] }
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
                    value={ Number(columns[currentTab].value) }
                    onChange={ ( newWidth ) => onChangeWidth( Number( newWidth ) ) }
                    min={ 1 }
                    max={ 12 }
                    step={ 1 }
                  />
              </PanelBody>
            </> );
        } }
      </TabPanel>
    </InspectorControls>

  );
}

export default applyWithColors( Inspector );
