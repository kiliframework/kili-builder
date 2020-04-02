import { RichText } from '@wordpress/block-editor';
import { attrClassCreator } from '../utils';

export default function SectionSave( { attributes } ) {
  const classes = attrClassCreator( attributes );

  return (
    <div className={ `${ classes }` }>
      <RichText.Content />
    </div>
  );
}
