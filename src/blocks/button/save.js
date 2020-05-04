import { RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
import { attrClassCreator } from '../utils';

export default function SaveButton( { attributes } ) {
  const { text } = attributes;

  const classes = attrClassCreator( attributes );

  return (
    <button className={ classnames( 'wp-block-button__link', `${ classes }` ) }>
      <RichText.Content
        value={ text }
      />
    </button>
  );
}
