import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, withFallbackStyles, TabPanel, Icon } from '@wordpress/components';

import OptionSelectorControl from '../../components/OptionsControl';

const justifyContentOptions = [
  {
    value: 'start',
    label: __( 'Start', 'kili-builder' ),
    tooltip: __( 'flex-start', 'kili-builder' ),
  },
  {
    value: 'center',
    label: __( 'Center', 'kili-builder' ),
    tooltip: __( 'center', 'kili-builder' ),
  },
  {
    value: 'end',
    label: __( 'End', 'kili-builder' ),
    tooltip: __( 'flex-end', 'kili-builder' ),
  },
  {
    value: 'space-between',
    label: __( 'Space between', 'kili-builder' ),
    tooltip: __( 'space-between', 'kili-builder' ),
  },
];
const alignItemsOptions = [
  {
    value: 'start',
    label: __( 'Start', 'kili-builder' ),
    tooltip: __( 'flex-start', 'kili-builder' ),
  },
  {
    value: 'center',
    label: __( 'Center', 'kili-builder' ),
    tooltip: __( 'center', 'kili-builder' ),
  },
  {
    value: 'end',
    label: __( 'End', 'kili-builder' ),
    tooltip: __( 'flex-end', 'kili-builder' ),
  },
];

export default function Inspector(props) {
  const { clientId,
    attributes,
    setAttributes,
    lastId, } = props;
  const {
    currentTab,
  } = attributes;
  console.log(currentTab);


  const onTabSelect = ( tabName ) => {
    setAttributes( { currentTab: tabName } );
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
              <OptionSelectorControl
                label={ __( 'Justify Content', 'kili-builder' ) }
                currentOption={ 'start' }
                options={ justifyContentOptions }
                onChange={ ( value ) => console.log(value)}
              />
              <OptionSelectorControl
                label={ __( 'Align Items', 'kili-builder' ) }
                currentOption={ 'start' }
                options={ alignItemsOptions }
                onChange={ ( value ) => console.log(value)}
              />
            </> );
        } }
      </TabPanel>
    </InspectorControls>

  );
}
