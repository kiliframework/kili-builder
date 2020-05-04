import { InspectorControls } from '@wordpress/block-editor';
import DevicesTabs from '../../components/DevicesTabs';
import { ToggleControl, RangeControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const { useCallback } = wp.element;

export default function Inspector( { attributes, setAttributes } ) {
  const {
    hasCaption,
    slidesToScroll,
    slidesToShow,
    dots,
    arrows } = attributes;

  const handleCarouselSettingsChange = ( tab, key, value ) => {
    setAttributes( { [ key ]: {
      ...attributes[ key ],
      [ tab ]: {
        ...attributes[ key ][ tab ],
        value,
      },
    } } );
  };

  const handleCardSettingsChange = ( value ) => setAttributes( { hasCaption: value } );

  return (
    <InspectorControls>
      <PanelBody initialOpen title={ __( 'Carousel Settings', 'kili-builder' ) }>
        <DevicesTabs>
          { ( { name: tab } ) => (
            <>
              <ToggleControl
                label={ __( 'Display arrows', 'kili-builder' ) }
                checked={ arrows[ tab ].value }
                onChange={ ( checked ) => handleCarouselSettingsChange( tab, 'arrows', checked ) }
              />
              <ToggleControl
                label={ __( 'Display dots', 'kili-builder' ) }
                checked={ dots[ tab ].value }
                onChange={ ( checked ) => handleCarouselSettingsChange( tab, 'dots', checked ) }
              />
              <RangeControl
                label={ __( 'Slides to show', 'kili-builder' ) }
                value={ slidesToShow[ tab ].value }
                onChange={ ( value ) => handleCarouselSettingsChange( tab, 'slidesToShow', value ) }
                min={ 1 }
                max={ 10 }
                step={ 1 }
              />
              <RangeControl
                label={ __( 'Slides to scroll', 'kili-builder' ) }
                value={ slidesToScroll[ tab ].value }
                onChange={ ( value ) => handleCarouselSettingsChange( tab, 'slidesToScroll', value ) }
                min={ 1 }
                max={ slidesToShow[ tab ].value }
                step={ 1 }
              />
            </>
          ) }
        </DevicesTabs>
      </PanelBody>
      <PanelBody title={ __( 'Slides Settings', 'kili-builder' ) }>
        <ToggleControl
          label={ __( 'Include caption', 'kili-builder' ) }
          checked={ hasCaption }
          onChange={ handleCardSettingsChange }
        />
      </PanelBody>

    </InspectorControls>
  );
}
