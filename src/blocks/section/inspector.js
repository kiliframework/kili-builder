import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { RangeControl, TabPanel, SelectControl } from '@wordpress/components';
import { attrOptionsBuiler, panelTabBuiler } from '../utils';

const { useCallback } = wp.element;

const justifyContentOptions = attrOptionsBuiler( [
  [ 'start', 'Start', 'flex-start' ],
  [ 'center', 'Center', 'center' ],
  [ 'end', 'End', 'flex-end' ],
  [ 'space-between', 'Space between', 'space-between' ],
] );

const alignItemsOptions = attrOptionsBuiler( [
  [ 'start', 'Start', 'flex-start' ],
  [ 'center', 'Center', 'center' ],
  [ 'end', 'End', 'flex-end' ],
] );

const flexDirectionOptions = attrOptionsBuiler( [
  [ 'row', 'Left to Right', 'Left to Right' ],
  [ 'row-reverse', 'Right to Left', 'Right to Left' ],
] );

export default function Inspector( props ) {
  const {
    attributes,
    setAttributes,
    updateColumns,
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
        tabs={ panelTabBuiler }
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
