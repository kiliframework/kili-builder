/* eslint-disable no-restricted-syntax */
import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, BaseControl, IconButton } from '@wordpress/components';

import FontStyles from '../../components/FontStyles';

export default function BannerInspector( props ) {
  const { attributes, onImageSelect } = props;
  const { id, url } = attributes;

  return (
    <InspectorControls>
      <MediaUploadCheck>
        <MediaUpload
          value={ id }
          onSelect={ onImageSelect }
          allowedTypes={ [ 'image' ] }
          render={ ( { open } ) => {
            return (
              <PanelBody title={ __( 'Image Settings', 'kili-builder' ) }>
                <BaseControl label={ __(
                  `${ url ? 'Edit Image' : 'Add Image' }`,
                  'kili-builder'
                ) } id="image controller">
                  <IconButton
                    className="button--add_edit"
                    onClick={ open }
                    icon="format-image"
                  />
                </BaseControl>
              </PanelBody>
            );
          } }
        />
      </MediaUploadCheck>
      <FontStyles { ...props } isHeading />
    </InspectorControls>

  );
}
