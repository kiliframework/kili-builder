import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, withFallbackStyles, TabPanel, Icon } from '@wordpress/components';

const { useCallback } = wp.element;

import OptionSelectorControl from '../../components/OptionsControl';

const justifyContentOptions = [
  {
    value: 'flex-start',
    label: __( 'Start', 'kili-builder' ),
    tooltip: __( 'flex-start', 'kili-builder' ),
  },
  {
    value: 'center',
    label: __( 'Center', 'kili-builder' ),
    tooltip: __( 'center', 'kili-builder' ),
  },
  {
    value: 'flex-end',
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
    value: 'flex-start',
    label: __( 'Start', 'kili-builder' ),
    tooltip: __( 'flex-start', 'kili-builder' ),
  },
  {
    value: 'center',
    label: __( 'Center', 'kili-builder' ),
    tooltip: __( 'center', 'kili-builder' ),
  },
  {
    value: 'flex-end',
    label: __( 'End', 'kili-builder' ),
    tooltip: __( 'flex-end', 'kili-builder' ),
  },
  {
    value: 'stretch',
    label: __( 'Stretch', 'kili-builder' ),
    tooltip: __( 'stretch', 'kili-builder' ),
  },
];

export default function Inspector( props ) {
  const { clientId,
    attributes,
    setAttributes,
    lastId } = props;
  const {
    currentTab,
  } = attributes;

  const onTabSelect = ( tabName ) => {
    setAttributes( { currentTab: tabName } );
  };

  const handleAttributeChange = useCallback(
    ( value, attribute ) => {
      setAttributes( { [ attribute ]: {
        ...attributes[ attribute ],
        [ currentTab ]: {
          ...attributes[ attribute ][ currentTab ],
          value,
        },
      } } );
    },
    [ attributes ],
  );

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
        { () => {
          return (
            <>
              <OptionSelectorControl
                label={ __( 'Justify Content', 'kili-builder' ) }
                currentOption={ attributes.justifyContent[ currentTab ].value }
                options={ justifyContentOptions }
                onChange={ ( value ) => handleAttributeChange( value, 'justifyContent' ) }
              />
              <OptionSelectorControl
                label={ __( 'Align Items', 'kili-builder' ) }
                currentOption={ attributes.alignItems[ currentTab ].value }
                options={ alignItemsOptions }
                onChange={ ( value ) => handleAttributeChange( value, 'alignItems' ) }
              />
            </> );
        } }
      </TabPanel>
    </InspectorControls>

  );
}
