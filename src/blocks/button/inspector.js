import { __ } from '@wordpress/i18n';
import {
  PanelBody,
  RangeControl,
  TextControl,
  ColorPalette,
  BaseControl,
  TabPanel,
} from '@wordpress/components';
import {
  InspectorControls,
} from '@wordpress/block-editor';

import { COLORS } from '../../constants';
import { HOVER, NORMAL } from '../../constants/pseudoClasses';

const { useCallback } = wp.element;

const MIN_BORDER_RADIUS_VALUE = 0;
const MAX_BORDER_RADIUS_VALUE = 50;
const INITIAL_BORDER_RADIUS_POSITION = 5;

function BorderPanel( { borderRadius = '', setAttributes } ) {
  const setBorderRadius = useCallback(
    ( newBorderRadius ) => {
      setAttributes( { borderRadius: newBorderRadius } );
    },
    [ setAttributes ]
  );
  return (
    <PanelBody title={ __( 'Border settings' ) }>
      <RangeControl
        value={ borderRadius }
        label={ __( 'Border radius' ) }
        min={ MIN_BORDER_RADIUS_VALUE }
        max={ MAX_BORDER_RADIUS_VALUE }
        initialPosition={ INITIAL_BORDER_RADIUS_POSITION }
        allowReset
        onChange={ setBorderRadius }
      />
    </PanelBody>
  );
}

export default function ButtonInspector( {
  attributes,
  setAttributes,
} ) {
  const {
    borderRadius,
    rel,
    backgroundColor,
    textColor,
  } = attributes;

  const handleAttrChange = useCallback(
    ( attr, value ) => {
      setAttributes( { [ attr ]: value } );
    },
    [],
  );
  const handlePseudoClassesAttrChange = useCallback(
    ( tab, attr, value ) => {
      setAttributes( { [ attr ]: {
        ...attributes[ attr ],
        [ tab ]: {
          ...attributes[ attr ][ tab ],
          value
        },
      } } );
    },
    [ attributes ],
  );

  return (
    <InspectorControls>
      <BorderPanel
        borderRadius={ borderRadius }
        setAttributes={ setAttributes }
      />
      <PanelBody title={ __( 'Text & Background Color Settings' ) }>
        <TabPanel
          className="kt-inspect-tabs kt-hover-tabs"
          activeClass="active-tab"
          tabs={ [
            {
              name: NORMAL,
              title: __( 'Normal' ),
            },
            {
              name: HOVER,
              title: __( 'Hover' ),
            },
          ] }>
          {
            ( { name: tab } ) => (
              <>
                <BaseControl label={ __( 'Text Color' ) }>
                  <ColorPalette
                    colors={ COLORS }
                    value={ textColor[tab].value }
                    onChange={ ( value ) => handlePseudoClassesAttrChange( tab, 'textColor', value ) }
                  />
                </BaseControl>
                <BaseControl label={ __( 'Background Color' ) }>
                  <ColorPalette
                    colors={ COLORS }
                    value={ backgroundColor[tab].value }
                    onChange={ ( value ) => handlePseudoClassesAttrChange( tab, 'backgroundColor', value ) }
                  />
                </BaseControl>
              </>
            )
          }
        </TabPanel>

      </PanelBody>
      <PanelBody title={ __( 'Link settings' ) }>
        <TextControl
          label={ __( 'Link rel' ) }
          value={ rel || '' }
          onChange={ ( value ) => handleAttrChange( 'rel', value ) }
        />
      </PanelBody>
    </InspectorControls>
  );
}
