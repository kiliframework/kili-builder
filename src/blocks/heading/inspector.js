import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';
const { useCallback } = wp.element;

import OptionSelectorControl from '../../components/OptionsControl';
import InputControl from '../../components/InputControl';
import { attrOptionsBuiler, panelTabBuiler } from '../utils';
import FontStyles from '../../components/FontStyles';

const fontSizeOptions = attrOptionsBuiler( [
  [ '32px', 'Medium', 'Medium' ],
  [ '48px', 'Big', 'Big' ],
] );

export default function Inspector( props ) {
  const { attributes, setAttributes } = props;
  const { currentTab, fontSize } = attributes;

  const handleAttributeChange = ( attribute, value ) => setAttributes( { [ attribute ]: value } );
  const onSizeChange = ( value ) => {
    const newVal = {
      ...fontSize,
      [ currentTab ]: {
        ...fontSize[ currentTab ],
        value,
      },
    };

    setAttributes( { fontSize: newVal } );
  };

  const fontSizevalue = fontSize[ currentTab ].value;

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
              <FontStyles {...props} />
            </> 
          );
        } }
      </TabPanel>
    </InspectorControls>

  );
}
