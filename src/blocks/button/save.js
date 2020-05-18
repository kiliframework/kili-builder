import { RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
import withStyles from '../../hoc/withStyles';
import buttonStyles from './style';
import { compose } from '@wordpress/compose';

function SaveButton( { attributes } ) {
  const { text, uniqueClassName } = attributes;
  return (
    <button className={ classnames( 'wp-block-button__link button', uniqueClassName ) }>
      <RichText.Content
        value={ text }
      />
    </button>
  );
}

export default compose(
  withStyles( buttonStyles ),
)( SaveButton );
