import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { RangeControl, TabPanel, Icon, SelectControl } from '@wordpress/components';

const { useCallback } = wp.element;

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
  const {
    clientId,
    attributes,
    setAttributes,
    updateColumns,
    lastId,
  } = props;
  const {
    currentTab,
    columns,
    flexDirection,
    alignItems,
    justifyContent,
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

  const handleNumberOfColumnsChange = useCallback(
    ( newColumns ) => {
      updateColumns( columns, newColumns );
      setAttributes( { columns: Number( newColumns ) } );
    },
    [ columns ],
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
              { currentTab === 'desktop' && (
                <RangeControl
                  label={ __( 'Number of Columns', 'kili-builder' ) }
                  value={ Number( columns ) }
                  onChange={ handleNumberOfColumnsChange }
                  min={ 1 }
                  max={ 12 }
                  step={ 1 }
                />
              ) }
              { currentTab !== 'desktop' && (
                <SelectControl
                  className={ 'components-font-size-picker__select' }
                  label={ __( 'Collapse Order', 'kili-builder' ) }
                  value={ flexDirection[ currentTab ].value }
                  onChange={ ( value ) => handleAttributeChange( value, 'flexDirection' ) }
                  options={ flexDirectionOptions }
                />
              ) }
              <SelectControl
                className={ 'components-font-size-picker__select' }
                label={ __( 'Justify Content', 'kili-builder' ) }
                value={ justifyContent[ currentTab ].value }
                onChange={ ( value ) => handleAttributeChange( value, 'justifyContent' ) }
                options={ justifyContentOptions }
              />
              <SelectControl
                className={ 'components-font-size-picker__select' }
                label={ __( 'Align Items', 'kili-builder' ) }
                value={ alignItems[ currentTab ].value }
                onChange={ ( value ) => handleAttributeChange( value, 'alignItems' ) }
                options={ alignItemsOptions }
              />

            </> );
        } }
      </TabPanel>
    </InspectorControls>

  );
}
