import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import './style.scss';
import { attrClassCreator } from '../utils';
import { DESKTOP } from '../../constants';

export default function ContainerSave( { attributes } ) {
  const { fullWidth, maxWidth, ...rest } = attributes;

  const getMaxWidthClass = ( ) => {
    let maxWidthClass = '';
    for ( const device of Object.keys( maxWidth ) ) {
      let cssProperty = '';
      const value = fullWidth[ device ].value ? 'none' : `${ maxWidth[ device ].value }`;
      if ( value ) {
        cssProperty = ` ${ maxWidth[ device ].prefix }--max-width__${ value }`;
        maxWidthClass += cssProperty;
      }
    }
    return maxWidthClass;
  };
  const maxWidthClass = getMaxWidthClass();
  console.log( maxWidthClass );

  const classes = attrClassCreator( { ...rest } );

  return (
    <div className={ classnames( 'wp-block-kili-container', `${ classes } ${ maxWidthClass }` ) }>
      <InnerBlocks.Content />
    </div>
  );
}
