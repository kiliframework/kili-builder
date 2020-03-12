import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

const { useCallback } = wp.element;

import OptionSelectorControl from '../../components/OptionsControl';
import { attrOptionsBuiler } from '../utils/attrOptionsBuiler';
import { panelTabBuiler } from '../utils/panelTabBuilder';

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

export default function Inspector( props ) {
  const { attributes, setAttributes } = props;
  const { currentTab } = attributes;

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
        tabs={ panelTabBuiler }
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
