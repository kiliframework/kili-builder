import { InspectorControls } from '@wordpress/block-editor';
import DevicesTabs from '../../components/DevicesTabs';
import { ToggleControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const { useCallback } = wp.element;

export default function Inspector( { attributes, setAttributes } ) {
  const { slickSettings, hasCaption } = attributes;

  const handleCarouselSettingsChange = ( key, value ) => {
    setAttributes( { slickSettings: {
      ...attributes.slickSettings,
      [ key ]: value,
    } } );
  };

  const handleCardSettingsChange = (value) => setAttributes({ hasCaption: value })

  return (
    <InspectorControls>
      <ToggleControl
        label={ __( 'Display arrows', 'kili-builder' ) }
        checked={ slickSettings.arrows }
        onChange={ ( checked ) => handleCarouselSettingsChange( 'arrows', checked ) }
      />
      <ToggleControl
        label={ __( 'Display dots', 'kili-builder' ) }
        checked={ slickSettings.dots }
        onChange={ ( checked ) => handleCarouselSettingsChange( 'dots', checked ) }
      />
      <RangeControl
        label={ __( 'Slides to show', 'kili-builder' ) }
        value={ slickSettings.slidesToShow }
        onChange={ ( value ) => handleCarouselSettingsChange( 'slidesToShow', value ) }
        min={ 1 }
        max={ 10 }
        step={ 1 }
      />
      <RangeControl
        label={ __( 'Slides to scroll', 'kili-builder' ) }
        value={ slickSettings.slidesToScroll }
        onChange={ ( value ) => handleCarouselSettingsChange( 'slidesToScroll', value ) }
        min={ 1 }
        max={ slickSettings.slidesToShow }
        step={ 1 }
      />
      <ToggleControl
        label={ __( 'Include caption', 'kili-builder' ) }
        checked={ hasCaption }
        onChange={ handleCardSettingsChange }
      />  
    </InspectorControls>
  );
}
