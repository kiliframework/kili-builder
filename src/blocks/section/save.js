import { InnerBlocks } from '@wordpress/block-editor';

export default function SectionSave( { attributes } ) {
  const { justifyContent, alignItems } = attributes;

  let classes = '';
  for ( const device of Object.keys( justifyContent ) ) {
    let cssProperty = '';
    if ( justifyContent[ device ].value ) {
      cssProperty += ` ${ justifyContent[ device ].prefix }--justify-content__${ justifyContent[ device ].value }`;
      classes += cssProperty;
    }
  }
  for ( const device of Object.keys( alignItems ) ) {
    let cssProperty = '';
    if ( alignItems[ device ].value ) {
      cssProperty += ` ${ alignItems[ device ].prefix }--align-items__${ alignItems[ device ].value }`;
      classes += cssProperty;
    }
  }

  return (
    <div className={ `flexgrid ${classes}` }>
      <InnerBlocks.Content />
    </div>
  );
}
