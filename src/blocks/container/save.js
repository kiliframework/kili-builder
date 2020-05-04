import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import './style.scss';
import { attrClassCreator } from '../utils';

export default function ContainerSave( { attributes } ) {
  const classes = attrClassCreator( attributes );

  return (
    <div className={ classnames( 'wp-block-kili-container', `${ classes }` ) }>
      <InnerBlocks.Content />
    </div>
  );
}
