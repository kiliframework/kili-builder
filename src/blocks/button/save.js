import { RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
import { attrClassCreator } from '../utils';
import { genericStylesCreator } from '../utils/styles/genericStylesCreator';

function SaveButton( { attributes } ) {
  const { text } = attributes;

  const styles = genericStylesCreator( attributes );
  console.log( styles );

  return (
    <button className={ classnames( 'button' ) }>
      <RichText.Content
        value={ text }
      />
    </button>
  );
}

export default SaveButton;
