
import { BaseControl, Dashicon, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MediaUpload } from '@wordpress/block-editor';

import './editor.scss';
import { useDeviceTab } from '../../hooks/useDeviceTab';
import { useClientID } from '../../hooks/useClientID';
import useAttributeSetter from '../../hooks/useAttributeSetter';
import { useSelect } from '@wordpress/data';
import { pick } from '../../blocks/utils/object';

const ImageControl = ( { attributeName, dimension, ...props } ) => {
  const { name: tab } = useDeviceTab();
  const clientID = useClientID();
  const { handleAttributesWithDeviceChange } = useAttributeSetter( clientID );
  const currentBlockAttributes = useSelect(
    ( select ) => select( 'core/block-editor' ).getBlockAttributes( clientID )
  );
  const onRemove = () => {
    if ( props.onRemove ) {
      props.onRemove();
    } else {
      props.onChange( {
        url: '',
        id: '',
        width: '',
        height: '',
      } );
    }
  };

  const selectedImage = currentBlockAttributes[ attributeName ][ tab ]?.value;
  console.log( selectedImage );

  return (
    <div className="ugb-image-control">
      <BaseControl label={ props.label } help={ props.help }>
        <MediaUpload
          onSelect={
            ( value ) => (
              handleAttributesWithDeviceChange( attributeName, tab, value, dimension )
            )
          }
          allowedTypes={ [ 'image' ] }
          value={ selectedImage?.id }
          render={ ( obj ) => {
            return (
              <>
                { selectedImage?.url &&
                <div className="ugb-image-preview-wrapper">
                  <button
                    className="ugb-image-preview-remove"
                    onClick={
                      ( ) => (
                        handleAttributesWithDeviceChange( attributeName, tab, { url: '', id: '', alt: '' } )
                      )
                    }
                  >
                    <Dashicon icon="no" />
                  </button>
                  <img
                    className="ugb-image-preview"
                    src={ selectedImage?.url }
                    alt="Test alt preview"
                  />
                </div>
                }
                { ! selectedImage?.url && (
                  <div
                    className="ugb-placeholder"
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
	onChange: ( { url, id, width, height } ) => {}, // eslint-disable-line
  onRemove: () => {},
  allowedTypes: [ 'image' ],
  help: '',
};

export default ImageControl;
