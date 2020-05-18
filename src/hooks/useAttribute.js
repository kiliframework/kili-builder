import useBlockAttributes from './useBlockAttributes';
import { useClientID } from './useClientID';
import { DESKTOP } from '../constants';

const { useCallback } = wp.element;

export default function useAttribute( attributeName ) {
  const { attributes } = useBlockAttributes( );
  const { setAttributes } = useClientID();

  const handleSimpleAttributesChange = useCallback(
    ( value, dimension ) => {
      setAttributes( { [ attributeName ]: dimension ? `${ value }${ dimension }` : value } );
    },
    [ attributes[ attributeName ] ],
  );
  const handleAttributeWithDeviceChange = useCallback(
    ( device, value, dimension ) => {
      setAttributes( {
        [ attributeName ]: {
          ...attributes[ attributeName ],
          [ device ]: {
            ...attributes[ attributeName ][ device ],
            value: dimension ? `${ value }${ dimension }` : value,
          },
        } } );
    },
    [ attributes[ attributeName ] ],
  );
  const handlePseudoClassesAttrChange = useCallback(
    ( device = DESKTOP, pseudo, value, dimension ) => {
      setAttributes( {
        [ attributeName ]: {
          ...attributes[ attributeName ],
          [ device ]: {
            ...attributes[ attributeName ][ device ],
            value: {
              ...attributes[ attributeName ][ device ].value,
              [ pseudo ]: dimension ? `${ value }${ dimension }` : value,
            },
          },
        },
      } );
    },
    [ attributes[ attributeName ] ],
  );
  return {
    attribute: attributes[ attributeName ],
    handleSimpleAttributesChange,
    handleAttributeWithDeviceChange,
    handlePseudoClassesAttrChange,
  };
}
