/* eslint-disable no-restricted-syntax */
import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { TabPanel, PanelBody, BaseControl, IconButton } from '@wordpress/components';

import FontStyles from '../../components/FontStyles';

export default function BannerInspector( props ) {
  const { attributes, setAttributes, handleImagesSelect } = props;
  const { id, url } = attributes;
  console.log( attributes );

  return (
    <InspectorControls>
      <MediaUploadCheck>
        <MediaUpload
          value={ id }
          onSelect={ handleImagesSelect }
          allowedTypes={ [ 'image' ] }
          render={ ( { open } ) => {
            return (
              <BaseControl label="Add Image" id="image controller">
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
      <FontStyles { ...props } isHeading />
    </InspectorControls>

  );
}
