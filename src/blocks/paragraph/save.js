import { RichText } from '@wordpress/block-editor';
import { attrClassCreator } from '../utils';

export default function SectionSave( { attributes } ) {
  const classes = attrClassCreator( attributes );

  return <RichText.Content className={ `${ classes }` } tagName="p" value={ attributes.text } />;
}
