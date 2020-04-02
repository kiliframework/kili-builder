import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

import { panelTabBuiler } from '../utils';
import FontStyles from '../../components/FontStyles';

export default function Inspector( props ) {
  const { attributes, setAttributes } = props;
  const { currentTab } = attributes;

  const handleAttributeChange = ( attribute, value ) => setAttributes( { [ attribute ]: value } );

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
              <FontStyles { ...props } />
            </>
          );
        } }
      </TabPanel>
    </InspectorControls>

  );
}
