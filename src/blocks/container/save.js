import { InnerBlocks } from '@wordpress/block-editor';
import { attrClassCreator } from '../utils';

export default function ContainerSave( { attributes } ) {
  const classes = attrClassCreator( attributes );

  return (
    <div className={ `${ classes }` }>
      <InnerBlocks.Content />
    </div>
  );
}
