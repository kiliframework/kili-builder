import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { isBlobURL } from '@wordpress/blob';
import {
  Spinner,
  withNotices,
  Toolbar,
  IconButton,
  PanelBody,
  TextareaControl,
  SelectControl,
  Dashicon,
  Tooltip,
  TextControl,
} from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import {
  RichText,
  MediaPlaceholder,
  BlockControls,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls,
  URLInput,
} from '@wordpress/block-editor';

class TeamMemberEdit extends Component {
  constructor( props ) {
    super( props );
    this.state = { selectedLink: null };
  }

  componentDidMount() {
    const { attributes, setAttributes } = this.props;
    const { url, id } = attributes;

    if ( url && isBlobURL( url ) && ! id ) {
      setAttributes( {
        url: '',
        alt: '',
      } );
    }
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.isSelected && ! this.props.isSelected ) {
      this.setState( {
        selectedLink: null,
      } );
    }
  }
  render() {
    const {
      className,
      attributes,
      setAttributes,
      noticeOperations,
      noticeUI,
      image,
      imageSizes,
      isSelected,
    } = this.props;
    const { title, info, url, alt, id, social } = attributes;
    const { createErrorNotice } = noticeOperations;
    const onChangeTitle = ( title ) => {
      setAttributes( { title } );
    };
    const onChangeInfo = ( info ) => {
      setAttributes( { info } );
    };
    const onSelectImage = ( { id, url, alt } ) => {
      setAttributes( { id, url, alt } );
    };
    const onSelectURL = ( url ) => setAttributes( { url, id: null, alt: '' } );
    const onUploadError = ( message ) => {
      createErrorNotice( message );
    };
    const removeImage = () => {
      setAttributes( { url: '', id: null, alt: '' } );
    };
    const updateAlt = ( alt ) => {
      setAttributes( { alt } );
    };
    const getImageSizes = () => {
      if ( ! image ) {
        return [];
      }
      const options = [];
      const sizes = image.media_details.sizes;
      for ( const key in sizes ) {
        const size = sizes[ key ];
        const imageSize = imageSizes.find( ( size ) => size.slug === key );
        if ( imageSize ) {
          options.push( {
            label: imageSize.name,
            value: size.source_url,
          } );
        }
      }
      return options;
    };
    const onImageSizeChange = ( url ) => {
      setAttributes( { url } );
    };
    const addNewLink = () => {
      setAttributes( { social: [ ...social, { icon: 'wordpress', link: '' } ] } );
      this.setState( {
        selectedLink: social.length,
      } );
    };
    const updateSocialItem = ( type, value ) => {
      const { social } = attributes;
      const { selectedLink } = this.state;
      const new_social = [ ...social ];
      new_social[ selectedLink ][ type ] = value;
      setAttributes( { social: new_social } );
    };
    const removeLink = ( e ) => {
      e.preventDefault();
      const { social } = attributes;
      const { selectedLink } = this.state;
      setAttributes( {
        social: [
          ...social.slice( 0, selectedLink ),
          ...social.slice( selectedLink + 1 ),
        ],
      } );
      this.setState( {
        selectedLink: null,
      } );
    };
    return (
      <>
        <InspectorControls>
          <PanelBody title={ __( 'Image Settings', 'kili-core' ) }>
            { url && ! isBlobURL( url ) && (
              <TextareaControl
                label={ __( 'Alt Text', 'kili-core' ) }
                value={ alt }
                onChange={ updateAlt }
                help={ __(
                  'Here you can update the alt property of a image',
                  'kili-core'
                ) }
              />
            ) }
            { id && (
              <SelectControl
                label={ __( 'Image Size', 'kili-core' ) }
                options={ getImageSizes() }
                onChange={ onImageSizeChange }
                value={ url }
              />
            ) }
          </PanelBody>
        </InspectorControls>
        <BlockControls>
          { url && (
            <Toolbar>
              { id && (
                <MediaUploadCheck>
                  <MediaUpload
                    value={ id }
                    onSelect={ onSelectImage }
                    allowedTypes={ [ 'image' ] }
                    render={ ( { open } ) => {
                      return (
                        <IconButton
                          className="components-icon-button components-toolbar__control"
                          label={ __( 'Edit Image', 'kili-code' ) }
                          onClick={ open }
                          icon="edit"
                        />
                      );
                    } }
                  />
                </MediaUploadCheck>
              ) }
              <IconButton
                className="components-icon-button components-toolbar__control"
                label="Remove Image"
                onClick={ removeImage }
                icon="trash"
              />
            </Toolbar>
          ) }
        </BlockControls>
        <div className={ className }>
          { url ? (
            <>
              <img src={ url } alt={ alt } />
              { isBlobURL( url ) && <Spinner /> }
            </>
          ) : (
            <MediaPlaceholder
              icon="format-image"
              onSelect={ ( image ) => onSelectImage( image ) }
              onSelectURL={ ( url ) => onSelectURL( url ) }
              onError={ ( message ) => onUploadError( message ) }
              // accept="image/*"
              allowedTypes={ [ 'image' ] }
              notices={ noticeUI }
            />
          ) }
          <RichText
            className="wp-block-kili-blocks-team-member__title"
            tagName="h4"
            onChange={ ( title ) => onChangeTitle( title ) }
            value={ title }
            placeholder={ __( 'Member Name', 'kili-core' ) }
            allowedFormats={ [] }
          />
          <RichText
            className="wp-block-kili-blocks-team-member__info"
            tagName="p"
            onChange={ ( info ) => onChangeInfo( info ) }
            value={ info }
            placeholder={ __( 'User Info', 'kili-core' ) }
            allowedFormats={ [] }
          />
          <div className="wp-block-kili-blocks-team-member__social">
            <ul>
              { social.map( ( s, i ) => {
                return (
                  <li
                    key={ i }
                    onClick={ () => this.setState( { selectedLink: i } ) }
                    className={
                      this.state.selectedLink === i ? 'is-selected' : null
                    }
                  >
                    <Dashicon icon={ s.icon } size={ 16 } />
                  </li>
                );
              } ) }
              { isSelected && (
                <li className="wp-block-kili-blocks-team-member__addIconLI">
                  <Tooltip text={ __( 'Add Item', 'kili-core' ) }>
                    <button
                      className="wp-block-kili-blocks-team-member__addIcon"
                      onClick={ addNewLink }
                    >
                      <Dashicon icon="plus" size={ 14 } />
                    </button>
                  </Tooltip>
                </li>
              ) }
            </ul>
          </div>
          { this.state.selectedLink !== null && (
            <div className="wp-block-kili-blocks-team-member__linkForm">
              <TextControl
                label={ __( 'Icon', 'kili-core' ) }
                value={ social[ this.state.selectedLink ].icon }
                onChange={ ( icon ) => updateSocialItem( 'icon', icon ) }
              />
              <URLInput
                label={ __( 'URL', 'kili-core' ) }
                value={ social[ this.state.selectedLink ].link }
                onChange={ ( url ) => updateSocialItem( 'link', url ) }
              />
              <a
                className="wp-block-kili-blocks-team-member__removeLink"
                onClick={ removeLink }
              >
                { __( 'Remove Link', 'kili-core' ) }
              </a>
            </div>
          ) }
        </div>
      </>
    );
  }
}

export default withSelect( ( select, props ) => {
  const id = props.attributes.id;
  return {
    image: id ? select( 'core' ).getMedia( id ) : null,
    imageSizes: select( 'core/block-editor' ).getSettings().imageSizes,
  };
} )( withNotices( TeamMemberEdit ) );
