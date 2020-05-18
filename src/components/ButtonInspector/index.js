import { __ } from '@wordpress/i18n';
import {
  PanelBody,
  TextControl,
} from '@wordpress/components';
import {
  InspectorControls,
} from '@wordpress/block-editor';

import AdvancedRangeControl from '../../components/AdvancedRangeControl';

import { PseudoTabProvider } from '../../hooks/usePseudoTab';
import AdvancedColorPalette from '../../components/AdvancedColorPalette';

const { useCallback } = wp.element;

export default function ButtonInspector( {
  attributes,
  setAttributes,
} ) {
  const {
    rel,
  } = attributes;

  const handleAttrChange = useCallback(
    ( attr, value ) => {
      setAttributes( { [ attr ]: value } );
    },
    [],
  );

  return (
    <>
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
          <AdvancedColorPalette
            label={ __( `Text Color`, 'kili-builder' ) }
            attributeName="textColor"
          />
          <AdvancedColorPalette
            label={ __( `Background Color `, 'kili-builder' ) }
            attributeName="backgroundColor"
          />
        </PseudoTabProvider>
      </PanelBody>
      <PanelBody title={ __( 'Link settings', 'kili-builder' ) }>
        <TextControl
          label={ __( 'Link rel', 'kili-builder' ) }
          value={ rel || '' }
          onChange={ ( value ) => handleAttrChange( 'rel', value ) }
        />
      </PanelBody>
    </>
  );
}
