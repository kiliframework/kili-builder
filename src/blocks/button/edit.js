import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import {
  __experimentalUseGradient,
  RichText,
  withColors,
} from '@wordpress/block-editor';

import Inspector from './inspector';

function ButtonEdit( props ) {
  const {
    attributes,
    setAttributes,
    className,
  } = props;
  const {
    borderRadius,
    placeholder,
    text,
    backgroundColor,
    textColor,
  } = attributes;
  
  return (
    <>
      <Inspector { ...props } />
      <div className={ className }>
        <RichText
          placeholder={ placeholder || __( 'Add text…' ) }
          value={ text }
          onChange={ ( value ) => setAttributes( { text: value } ) }
          withoutInteractiveFormatting
          className={ classnames( 'wp-block-button__link', {
            'no-border-radius': borderRadius === 0,
          } ) }
          style={ {
            backgroundColor: backgroundColor.normal.value,
            color: textColor.normal.value,
            borderRadius: borderRadius
              ? borderRadius + 'px'
              : undefined,
          } }
        />
      </div>
    </>
  );
}

export default ButtonEdit;
