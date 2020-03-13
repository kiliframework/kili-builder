import './editor.scss';

import attributes from './attributes';
import edit from './edit';
import save from './save';
import BackgroundAttributes from '../../components/Background/attributes';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// const editBlock = function (props) {
//   const { attributes: { content }, setAttributes, className } = props;
//   const onChangeContent = (newContent) => {
//     setAttributes({ content: newContent });
//   };
//   return (
//     <RichText
//       tagName="p"
//       className={className}
//       onChange={onChangeContent}
//       value={content}
//     />
//   );
// };
// const editBlock = function( props ) {
//   return <Fragment>
//     <InnerBlocks></InnerBlocks>
//     <InspectorControls>
//       <PanelBody title={ __( 'Section settings', 'kili-builder' ) }>
//         <PanelRow>
//           <ToggleControl
//             label={ __( 'Use container', 'kili-builder' ) }
//             onChange={ ( value ) => {
//               props.setAttributes( { useContainer: value } );
//             } }
//             checked={ props.attributes.useContainer } />
//         </PanelRow>
//         <PanelRow className="kili-section__component-item">
//           { props.attributes.mobileBackgroundImage
//             ? <div className="components-base-control">
//               <img src={ props.attributes.mobileBackgroundImage } className="kili-section__placeholder-image" />
//             </div>
//             : <p>{ __( 'No image has been set yet', 'kili-builder' ) }</p> }
//           <MediaUploadCheck>
//             <MediaUpload
//               onSelect={ ( media ) => {
//                 props.setAttributes( { mobileBackgroundImage: media.url, mobileBackgroundImageId: media.id } );
//               } }
//               allowedTypes={ [ 'image' ] }
//               value={ props.attributes.mobileBackgroundImageId }
//               render={ ( { open } ) => (
//                 <Button onClick={ open }>{ __( 'Mobile background image', 'kili-builder' ) }</Button>
//               ) }
//             />
//           </MediaUploadCheck>
//         </PanelRow>
//         <PanelRow className="kili-section__component-item">
//           { props.attributes.backgroundImage
//             ? <div className="components-base-control">
//               <img src={ props.attributes.backgroundImage } className="kili-section__placeholder-image" />
//             </div>
//             : <p>{ __( 'No image has been set yet', 'kili-builder' ) }</p> }
//           <MediaUploadCheck>
//             <MediaUpload
//               onSelect={ ( media ) => {
//                 props.setAttributes( { backgroundImage: media.url, backgroundImageId: media.id } );
//               } }
//               allowedTypes={ [ 'image' ] }
//               value={ props.attributes.backgroundImage }
//               render={ ( { open } ) => (
//                 <Button onClick={ open }>{ __( 'Desktop background image', 'kili-builder' ) }</Button>
//               ) }
//             />
//           </MediaUploadCheck>
//         </PanelRow>
//       </PanelBody>
//       <PanelColorSettings
//         title={ __( 'Background color', 'kili-builder' ) }
//         colorSettings={ [
//           {
//             label: __( 'Choose color', 'kili-builder' ),
//             value: props.attributes.backgroundColor,
//             onChange: ( value ) => {
//               props.setAttributes( { backgroundColor: value } );
//             },
//           },
//         ] } />
//       <PanelBody title={ __( 'Mobile settings', 'kili-builder' ) } initialOpen={ false }>
//         <PanelRow className="kili-section__component-item">
//           <RangeControl
//             label={ __( 'Margin bottom (in px)', 'kili-builder' ) }
//             onChange={ ( value ) => {
//               props.setAttributes( { marginBottomMobile: value } );
//             } }
//             value={ props.attributes.marginBottomMobile }
//             min={ 0 }
//             max={ 100 } />
//         </PanelRow>
//         <PanelRow className="kili-section__component-item">
//           <RangeControl
//             label={ __( 'Margin top (in px)', 'kili-builder' ) }
//             onChange={ ( value ) => {
//               props.setAttributes( { marginTopMobile: value } );
//             } }
//             value={ props.attributes.marginTopMobile }
//             min={ 0 }
//             max={ 100 } />
//         </PanelRow>
//         <PanelRow className="kili-section__component-item">
//           <RangeControl
//             label={ __( 'Padding bottom (in px)', 'kili-builder' ) }
//             onChange={ ( value ) => {
//               props.setAttributes( { paddingBottomMobile: value } );
//             } }
//             value={ props.attributes.paddingBottomMobile }
//             min={ 0 }
//             max={ 100 } />
//         </PanelRow>
//         <PanelRow className="kili-section__component-item">
//           <RangeControl
//             label={ __( 'Padding top (in px)', 'kili-builder' ) }
//             onChange={ ( value ) => {
//               props.setAttributes( { paddingTopMobile: value } );
//             } }
//             value={ props.attributes.paddingTopMobile }
//             min={ 0 }
//             max={ 100 } />
//         </PanelRow>
//       </PanelBody>
//       <PanelBody title={ __( 'Desktop settings', 'kili-builder' ) } initialOpen={ false }>
//         <PanelRow className="kili-section__component-item">
//           <RangeControl
//             label={ __( 'Margin bottom (in px)', 'kili-builder' ) }
//             onChange={ ( value ) => {
//               props.setAttributes( { marginBottomDesktop: value } );
//             } }
//             value={ props.attributes.marginBottomDesktop }
//             min={ 0 }
//             max={ 100 } />
//         </PanelRow>
//         <PanelRow className="kili-section__component-item">
//           <RangeControl
//             label={ __( 'Margin top (in px)', 'kili-builder' ) }
//             onChange={ ( value ) => {
//               props.setAttributes( { marginTopDesktop: value } );
//             } }
//             value={ props.attributes.marginTopDesktop }
//             min={ 0 }
//             max={ 100 } />
//         </PanelRow>
//         <PanelRow className="kili-section__component-item">
//           <RangeControl
//             label={ __( 'Padding bottom (in px)', 'kili-builder' ) }
//             onChange={ ( value ) => {
//               props.setAttributes( { paddingBottomDesktop: value } );
//             } }
//             value={ props.attributes.paddingBottomDesktop }
//             min={ 0 }
//             max={ 100 } />
//         </PanelRow>
//         <PanelRow className="kili-section__component-item">
//           <RangeControl
//             label={ __( 'Padding top (in px)', 'kili-builder' ) }
//             onChange={ ( value ) => {
//               props.setAttributes( { paddingTopDesktop: value } );
//             } }
//             value={ props.attributes.paddingTopDesktop }
//             min={ 0 }
//             max={ 100 } />
//         </PanelRow>
//       </PanelBody>
//     </InspectorControls>
//   </Fragment>;
// };

// const processStyles = function( props ) {
//   let styles = '';
//   const customClassName = '.kili-section-' + props.attributes.UUID;
//   if ( props.attributes.backgroundColor ) {
//     styles += customClassName + '{background-color:' + props.attributes.backgroundColor + ';';
//   }
//   if ( props.attributes.paddingTopMobile ) {
//     styles += ( styles !== '' ? '' : customClassName + '{' ) +
//       'padding-top:' + props.attributes.paddingTopMobile + 'px;';
//   }
//   if ( props.attributes.paddingBottomMobile ) {
//     styles += ( styles !== '' ? '' : customClassName + '{' ) +
//       'padding-bottom:' + props.attributes.paddingBottomMobile + 'px;';
//   }
//   if ( props.attributes.marginTopMobile ) {
//     styles += ( styles !== '' ? '' : customClassName + '{' ) +
//       'margin-top:' + props.attributes.marginTopMobile + 'px;';
//   }
//   if ( props.attributes.marginBottomMobile ) {
//     styles += ( styles !== '' ? '' : customClassName + '{' ) +
//       'margin-bottom:' + props.attributes.marginBottomMobile + 'px;';
//   }
//   if ( styles !== '' ) {
//     styles += '}';
//   }
//   if ( props.attributes.paddingBottomDesktop ||
//     props.attributes.paddingTopDesktop ||
//     props.attributes.marginTopDesktop ||
//     props.attributes.marginBottomDesktop ) {
//     let deskStyle = '';
//     if ( props.attributes.paddingBottomDesktop ) {
//       deskStyle = customClassName + '{padding-bottom:' + props.attributes.paddingBottomDesktop + 'px;';
//     }
//     if ( props.attributes.paddingTopDesktop ) {
//       deskStyle += ( deskStyle === '' ? customClassName + '{' : '' );
//       deskStyle += 'padding-top:' + props.attributes.paddingTopDesktop + 'px;';
//     }
//     if ( props.attributes.marginBottomDesktop ) {
//       deskStyle = customClassName + '{margin-bottom:' + props.attributes.marginBottomDesktop + 'px;';
//     }
//     if ( props.attributes.marginTopDesktop ) {
//       deskStyle += ( deskStyle === '' ? customClassName + '{' : '' );
//       deskStyle += 'margin-top:' + props.attributes.marginTopDesktop + 'px;';
//     }
//     if ( deskStyle !== '' ) {
//       deskStyle += '}';
//       styles += '@media all and (min-width:815px){' + deskStyle + '}';
//     }
//   }
//   return styles;
// };

// const saveBlock = function( props ) {
//   const styles = processStyles( props );
//   let classNameString = typeof props.className ? '' : props.className;
//   if ( typeof props.attributes.UUID !== 'undefined' ) {
//     classNameString += ' kili-section-' + props.attributes.UUID;
//   }

//   classNameString = classNameString.replace( 'undefined', '' );
//   classNameString = classNameString.replace( /\s{2,}/g, ' ' );

//   return <section className={ classNameString }>
//     <div className={ props.attributes.useContainer ? 'container' : '' }>
//       <InnerBlocks.Content />
//     </div>
//     { styles !== '' ? <style>{ styles }</style> : '' }
//   </section>;
// };

registerBlockType( 'kili/container', {
  attributes,
  category: 'kili-builder',
  icon: 'editor-insertmore',
  edit,
  save,
  supports: {
    align: [ 'wide', 'full' ],
  },
  title: __( 'Kili Container', 'kili-builder' ),
  description: __( 'Creates a container element', 'kili-builder' ),
} );
