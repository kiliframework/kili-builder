import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import {
  RichText,
} from '@wordpress/block-editor';

import Inspector from './inspector';
import { DESKTOP } from '../../constants';

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
  console.log( attributes );

  return (
    <>
      <Inspector { ...props } />
      <div className={ className }>
        <RichText
          placeholder={ placeholder || __( 'Add text…', 'kili-builder' ) }
          value={ text }
          onChange={ ( value ) => setAttributes( { text: value } ) }
          withoutInteractiveFormatting
          className={ classnames( 'wp-block-button__link', {
            'no-border-radius': borderRadius === 0,
          } ) }
          style={ {
            backgroundColor: backgroundColor[ DESKTOP ].value.normal,
            color: textColor[ DESKTOP ].value.normal,
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
