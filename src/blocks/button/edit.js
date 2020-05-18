import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import AdvancedRichText from '../../components/AdvancedRichText';

import Inspector from './inspector';
import { DESKTOP } from '../../constants';
import withStyles from '../../hoc/withStyles';
import withUniqueClassName from '../../hoc/withUniqueClassName';
import withClientID from '../../hoc/withClientID';
import buttonStyles from './style';

function ButtonEdit( props ) {
  const {
    attributes,
  } = props;
  const {
    placeholder,
    uniqueClassName,
  } = attributes;

  return (
    <>
      <Inspector { ...props } />
      <AdvancedRichText
        placeholder={ placeholder || __( 'Add text…', 'kili-builder' ) }
        attributeName="text"
        withoutInteractiveFormatting
        className={ classnames( 'wp-block-button__link', uniqueClassName ) }
      />
    </>
  );
}

export default compose(
  withClientID,
  withUniqueClassName,
  withStyles( buttonStyles ),
)( ButtonEdit );
