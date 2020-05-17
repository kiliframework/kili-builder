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

import { COLORS, DESKTOP } from '../../constants';
import { HOVER, NORMAL } from '../../constants/pseudoClasses';

const { useCallback } = wp.element;

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
        [ DESKTOP ]: {
          ...attributes[ attr ][ DESKTOP ],
          value: {
            ...attributes[ attr ][ DESKTOP ].value,
            [ tab ]: value,
          },
        },
      } } );
    },
    [ attributes ],
  );

  return (
    <InspectorControls>
      <PanelBody title={ __( 'Border settings', 'kili-builder' ) }>
        <RangeControl
          value={ borderRadius }
          label={ __( 'Border radius', 'kili-builder' ) }
          min={ 0 }
          max={ 50 }
          allowReset
          onChange={ ( value ) => handleAttrChange( 'borderRadius', value ) }
        />
      </PanelBody>
      <PanelBody title={ __( 'Text & Background Color Settings', 'kili-builder' ) }>
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
          ] }
        >
          {
            ( { name: tab, title } ) => (
              <>
                <BaseControl label={ __( `Text Color ${ title }`, 'kili-builder' ) }>
                  <ColorPalette
                    colors={ COLORS }
                    value={ textColor[ DESKTOP ].value[ tab ] }
                    onChange={ ( value ) => handlePseudoClassesAttrChange( tab, 'textColor', value ) }
                  />
                </BaseControl>
                <BaseControl label={ __( `Background Color ${ title }`, 'kili-builder' ) }>
                  <ColorPalette
                    colors={ COLORS }
                    value={ backgroundColor[ DESKTOP ].value[ tab ] }
                    onChange={ ( value ) => handlePseudoClassesAttrChange( tab, 'backgroundColor', value ) }
                  />
                </BaseControl>
              </>
            )
          }
        </TabPanel>

      </PanelBody>
      <PanelBody title={ __( 'Link settings', 'kili-builder' ) }>
        <TextControl
          label={ __( 'Link rel', 'kili-builder' ) }
          value={ rel || '' }
          onChange={ ( value ) => handleAttrChange( 'rel', value ) }
        />
      </PanelBody>
    </InspectorControls>
  );
}
