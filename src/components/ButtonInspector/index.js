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
    buttonBorderRadius,
    buttonRel,
    buttonBackgroundColor,
    buttonTextColor,
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
    <>
      <PanelBody title={ __( 'Border settings', 'kili-builder' ) }>
        <RangeControl
          value={ buttonBorderRadius }
          label={ __( 'Border radius', 'kili-builder' ) }
          min={ 0 }
          max={ 50 }
          allowReset
          onChange={ ( value ) => handleAttrChange( 'buttonBorderRadius', value ) }
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
          ] }>
          {
            ( { name: tab, title } ) => (
              <>
                <BaseControl label={ __( `Text Color ${ title }`, 'kili-builder' ) }>
                  <ColorPalette
                    colors={ COLORS }
                    value={ buttonTextColor[ DESKTOP ].value[ tab ] }
                    onChange={ ( value ) => handlePseudoClassesAttrChange( tab, 'buttonTextColor', value ) }
                  />
                </BaseControl>
                <BaseControl label={ __( `Background Color ${ title }`, 'kili-builder' ) }>
                  <ColorPalette
                    colors={ COLORS }
                    value={ buttonBackgroundColor[ DESKTOP ].value[ tab ] }
                    onChange={ ( value ) => handlePseudoClassesAttrChange( tab, 'buttonBackgroundColor', value ) }
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
          value={ buttonRel || '' }
          onChange={ ( value ) => handleAttrChange( 'buttonRel', value ) }
        />
      </PanelBody>
    </>
  );
}
