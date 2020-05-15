import { useClientID } from '../../hooks/useClientID';
import useBlockAttributes from '../../hooks/useBlockAttributes';
import { RichText } from '@wordpress/block-editor';

function AdvancedRichText( { attributeName, ...props } ) {
  const clientID = useClientID();
  const { handleSimpleAttributesChange, attributes } = useBlockAttributes( clientID );
  return (
    <RichText
      value={ attributes[ attributeName ] }
      onChange={ ( value ) => handleSimpleAttributesChange( attributeName, value ) }
      { ...props }
    />
  );
}

export default AdvancedRichText;
