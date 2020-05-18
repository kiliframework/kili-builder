import { RichText } from '@wordpress/block-editor';
import useBlockAttributes from '../../hooks/useBlockAttributes';

function AdvancedRichText( { attributeName, ...props } ) {
  const { handleSimpleAttributesChange, attributes } = useBlockAttributes();
  return (
    <RichText
      value={ attributes[ attributeName ] }
      onChange={ ( value ) => handleSimpleAttributesChange( attributeName, value ) }
      { ...props }
    />
  );
}

export default AdvancedRichText;
