import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { attrClassCreator } from '../utils';

export default function ColumnSave( { attributes } ) {
  const { columns } = attributes;
  const classes = attrClassCreator( attributes );

  const getGridClasses = ( ) => {
    let gridClasses = '';
    for ( const device of Object.keys( columns ) ) {
      let cssProperty = '';
      const value = ( columns[ device ].value / 12 ) * 100;
      if ( value ) {
        cssProperty = ` ${ columns[ device ].prefix }--flex-basis__${ Number( value.toFixed( 3 ) ) }%`;
        gridClasses += cssProperty;
        cssProperty = ` ${ columns[ device ].prefix }--max-width__${ Number( value.toFixed( 3 ) ) }%`;
        gridClasses += cssProperty;
      }
    }
    return gridClasses;
  };

  return (
    <div className={ `kili-column-inner flexgrid__item ${ getGridClasses() }` }>
      <div className={ classes }>
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
