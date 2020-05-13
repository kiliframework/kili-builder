import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import './style.scss';
import { attrClassCreator } from '../utils';
import { DESKTOP } from '../../constants';
import BlockSave from '../../components/BlockSave/BlockSave';
import { saveStyleCreator } from '../utils/saveStyleCreator';
import { v4 as uuid } from 'uuid';

export default function ContainerSave( { attributes } ) {
  const { fullWidth, maxWidth } = attributes;

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

  const styles = saveStyleCreator( attributes );

  return (
    <>
      <div data-unique-id={ attributes.uniqueID } className={ classnames( 'wp-block-kili-container', `kili-${ attributes.uniqueID }` ) }>
        <InnerBlocks.Content />
      </div>
      <style>
        { styles }
      </style>
    </>
  );
}
