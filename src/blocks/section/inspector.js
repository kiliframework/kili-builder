import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, withFallbackStyles, TabPanel, Icon, SelectControl, BaseControl } from '@wordpress/components';

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
const flexDirectionOptions = [
  {
    value: 'row',
    label: __( 'Left to Right', 'kili-builder' ),
    tooltip: __( 'Left to Right', 'kili-builder' ),
  },
  {
    value: 'row-reverse',
    label: __( 'Right to Left', 'kili-builder' ),
    tooltip: __( 'Right to Left', 'kili-builder' ),
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

  // const handleMaxWidth = useCallback(
  //   () => {

  //   },
  //   [],
  // )

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
              { currentTab !== 'desktop' && (
                <SelectControl
                  className={ 'components-font-size-picker__select' }
                  label={ __( 'Collapse Order', 'kili-builder' ) }
                  value={ attributes.flexDirection[ currentTab ].value }
                  onChange={ ( value ) => handleAttributeChange( value, 'flexDirection' ) }
                  options={ flexDirectionOptions }
                />
              )}
              <SelectControl
                  className={ 'components-font-size-picker__select' }
                  label={ __( 'Justify Content', 'kili-builder' ) }
                  value={ attributes.justifyContent[ currentTab ].value }
                  onChange={ ( value ) => handleAttributeChange( value, 'justifyContent' ) }
                  options={ justifyContentOptions }
                />
              <SelectControl
                  className={ 'components-font-size-picker__select' }
                  label={ __( 'Align Items', 'kili-builder' ) }
                  value={ attributes.alignItems[ currentTab ].value }
                  onChange={ ( value ) => handleAttributeChange( value, 'alignItems' ) }
                  options={ alignItemsOptions }
                />
              {/* <RangeControl
                label={ __( 'Max Width', 'kili-builder' ) }
                value={ Number(columns[currentTab].value) }
                onChange={ ( newWidth ) => onChangeWidth( Number( newWidth ) ) }
                min={ 1 }
                max={ 12 }
                step={ 1 }
              /> */}
            </> );
        } }
      </TabPanel>
    </InspectorControls>

  );
}
