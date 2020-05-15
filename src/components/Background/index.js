import { SelectControl, PanelBody, PanelRow, IconButton, Tooltip, Button, Dashicon, BaseControl, ColorPalette, RangeControl } from '@wordpress/components';
import { attrOptionsBuiler } from '../../blocks/utils';
import { MediaUploadCheck, MediaUpload, PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { COLORS } from '../../constants';
import AdvancedRangeControl from '../AdvancedRangeControl';
import AdvancedColorPalette from '../AdvancedColorPalette';
import ImageControl from '../ImageControl';

const { useCallback } = wp.element;

const backgroundImageSizeOptions = attrOptionsBuiler( [
  [ 'cover', 'Cover', 'Cover' ],
  [ 'contain', 'Contain', 'Contain' ],
  [ 'auto', 'Auto', 'Auto' ],
] );

export default function BackgroundControl( { attributes, setAttributes, device } ) {
  const { id, url, alt, backgroundImage, backgroundSize } = attributes;

  const handleBackgroundAttrChange = useCallback(
    ( value, attrName ) => {
      setAttributes( {
        [ attrName ]: {
          ...attributes[ attrName ],
          [ device ]: {
            ...attributes[ attrName ][ device ],
            value,
          },
        },
      } );
    },
    [ attributes, device ],
  );

  return (
    <>
      <PanelBody title={ __( 'Background Settings', 'kili-builder' ) }>
        <AdvancedRangeControl
          label={ __( 'Opacity', 'kili-builder' ) }
          attributeName="opacity"
          min={ 0 }
          max={ 1 }
          step={ 0.01 }
        />
        <AdvancedColorPalette
          attributeName="backgroundColor"
          label="Color"
          colors={ COLORS }
        />
        <MediaUploadCheck>
          <ImageControl
            attributeName="backgroundImage"
            label={ __( 'Background Image', 'kili-builder' ) }
            id={ id }
            allowedTypes={ [ 'image' ] }
          />
        </MediaUploadCheck>

        { backgroundImage[ device ]?.value?.url && (
          <>
            <SelectControl
              className={ 'components-font-size-picker__select' }
              label={ `Background Image Size` }
              value={ backgroundSize[ device ]?.value }
              options={ backgroundImageSizeOptions }
              onChange={ ( value ) => handleBackgroundAttrChange( value, 'backgroundSize' ) }
            />
            <SelectControl
              className={ 'components-font-size-picker__select' }
              label={ `Background Position` }
              value={ backgroundSize[ device ]?.value }
              options={ backgroundImageSizeOptions }
              onChange={ ( value ) => handleBackgroundAttrChange( value, 'backgroundSize' ) }
            />
          </>
        ) }

      </PanelBody>
    </>
  );
}
