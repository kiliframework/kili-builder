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

import AdvancedRangeControl from '../../components/AdvancedRangeControl';

import { COLORS, DESKTOP } from '../../constants';
import { HOVER, NORMAL } from '../../constants/pseudoClasses';
import { PseudoTabProvider } from '../../hooks/usePseudoTab';
import AdvancedColorPalette from '../../components/AdvancedColorPalette';

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
        <AdvancedRangeControl
          attributeName="borderRadius"
          label={ __( 'Border radius', 'kili-builder' ) }
          min={ 0 }
          max={ 50 }
          allowReset
          dimension="px"
        />
      </PanelBody>
      <PanelBody title={ __( 'Text & Background Color Settings', 'kili-builder' ) }>
        <PseudoTabProvider>
          { ( { title } ) => (
            <>
              <AdvancedColorPalette
                label={ __( `Text Color ${ title }`, 'kili-builder' ) }
                attributeName="textColor"
              />
              <AdvancedColorPalette
                label={ __( `Background Color ${ title }`, 'kili-builder' ) }
                attributeName="backgroundColor"
              />
            </>
          ) }
        </PseudoTabProvider>
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
