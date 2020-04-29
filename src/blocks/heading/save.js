import { RichText } from '@wordpress/block-editor';
import { attrClassCreator } from '../utils';

export default function SectionSave( { attributes } ) {
  const { level, ...rest } = attributes;
  const classes = attrClassCreator( rest );
  const tagName = 'h' + level;
  return <RichText.Content className={ `${ classes }` }tagName={ level && tagName } value={ attributes.text } />;
}
