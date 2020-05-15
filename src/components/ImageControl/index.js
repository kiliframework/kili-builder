
import { BaseControl, Dashicon, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MediaUpload } from '@wordpress/block-editor';

import './editor.scss';
import { compose } from '@wordpress/compose';
import withAdvancedControls from '../../hoc/withAdvancedControls';

const ImageControl = ( { value, onChange, ...props } ) => {
  return (
    <div className="kili-image-control">
      <BaseControl label={ props.label } help={ props.help }>
        <MediaUpload
          onSelect={ onChange }
          allowedTypes={ [ 'image' ] }
          value={ value?.id }
          render={ ( obj ) => {
            return (
              <>
                { value?.url &&
                <div className="kili-image-preview">
                  <button
                    className="kili-image-preview__remove"
                    onClick={ () => onChange( { url: '', id: '', alt: '' } ) }
                  >
                    <Dashicon icon="no" />
                  </button>
                  <img
                    className="kili-image-preview__image"
                    src={ value?.url }
                    alt="Test alt preview"
                  />
                </div>
                }
                { ! value?.url && (
                  <div
                    className="kili-placeholder"
                    onClick={ obj.open }
                    onKeyDown={ ( event ) => {
                      if ( event.keyCode === 13 ) {
                        obj.open();
                      }
                    } }
                    role="button"
                    tabIndex={ 0 }
                  >
                    <Icon icon="format-image" />
                  </div>
                ) }
              </>
            );
          } }
        />
      </BaseControl>
    </div>
  );
};

ImageControl.defaultProps = {
  label: '',
  id: '',
  url: '',
  onChange: ( { url, id, width, height } ) => {},
  allowedTypes: [ 'image' ],
  help: '',
};

export default compose(
  withAdvancedControls
)( ImageControl );
