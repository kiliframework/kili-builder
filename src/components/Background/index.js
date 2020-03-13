import { SelectControl, PanelBody, PanelRow, IconButton, Tooltip, Button, Dashicon, BaseControl, ColorPalette } from '@wordpress/components';
import { attrOptionsBuiler } from '../../blocks/utils';
import { MediaUploadCheck, MediaUpload, PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { COLORS } from '../../constants';



const { useCallback } = wp.element;

const backgroundImageSizeOptions = attrOptionsBuiler( [
  [ 'cover', 'Cover', 'Cover' ],
  [ 'contain', 'Contain', 'Contain' ],
  [ 'auto', 'Auto', 'Auto' ],
] );

export default function BackgroundControl( { attributes, setAttributes, device } ) {
  const { id, url, alt, fullWidth, backgroundColor,backgroundImage, backgroundSize } = attributes;

  const onRemoveImage = () => {
    setAttributes( {
      id: null,
      url: null,
      alt: null,
    } );
  };

  const handleBackgroundAttrChange = useCallback(
    (value, attrName) => {
      setAttributes({
        [attrName]: {
          ...attributes[attrName],
          [device]: {
            ...attributes[attrName],
            value
          }
        }
      })
    },
    [attributes],
  )

  return (
    <>
      <PanelBody title={ __( 'Background Settings', 'kili-builder' ) }>
        <BaseControl label="Color">
          <ColorPalette
            colors={COLORS}
            value={backgroundColor[device].value}
            onChange={(value) => handleBackgroundAttrChange(value, 'backgroundColor')}
          />
        </BaseControl>
        <MediaUploadCheck>
          <MediaUpload
            value={ id }
            onSelect={ ( img ) => handleBackgroundAttrChange( `url(${img.url})`, 'backgroundImage' ) }
            allowedTypes={ [ 'image' ] }
            render={ ( { open } ) => {
              return (
                <BaseControl label="Add Image">
                  <IconButton
                    className="button--add_edit"
                    label={ __(
                      `${ url ? 'Edit Image' : 'Add Image' }`,
                      'kili-builder'
                    ) }
                    onClick={ open }
                    icon="format-image"
                  />
                </BaseControl>
              );
            } }
            />
          </MediaUploadCheck>

        { backgroundImage[device].value && (
          <>
            <SelectControl
              className={ 'components-font-size-picker__select' }
              label={ `Background Image Size` }
              value={backgroundSize[device].value}
              options={ backgroundImageSizeOptions }
              onChange={(value) => handleBackgroundAttrChange(value, 'backgroundSize')}
            />
            <SelectControl
              className={ 'components-font-size-picker__select' }
              label={ `Background Position` }
              value={backgroundSize[device].value}
              options={ backgroundImageSizeOptions }
              onChange={(value) => handleBackgroundAttrChange(value, 'backgroundSize')}
            />
          </>
        )}

      </PanelBody>
    </>
  );
}