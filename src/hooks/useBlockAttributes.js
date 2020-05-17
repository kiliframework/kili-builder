import { useSelect, useDispatch } from '@wordpress/data';
const { useCallback } = wp.element;

export default function useBlockAttributes( clientId ) {
  const { attributes } = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ) );
  const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

  const handleSimpleAttributesChange = useCallback(
    ( attribute, value ) => {
      updateBlockAttributes( clientId, {
        ...attributes,
        [ attribute ]: value } );
    },
    [ clientId, attributes ],
  );
  const handleAttributesWithDeviceChange = useCallback(
    ( attribute, device, value, dimension ) => {
      updateBlockAttributes( clientId, {
        ...attributes,
        [ attribute ]: {
          ...attributes[ attribute ],
          [ device ]: {
            ...attributes[ attribute ][ device ],
            value: dimension ? `${ value }${ dimension }` : value,
          },
        } } );
    },
    [ clientId, attributes ],
  );

  const handlePseudoClassesAttrChange = useCallback(
    ( attribute, device, pseudo, value, dimension ) => {
      updateBlockAttributes( clientId, {
        ...attributes,
        [ attribute ]: {
          ...attributes[ attribute ],
          [ device ]: {
            ...attributes[ attribute ][ device ],
            value: {
              ...attributes[ attribute ][ device ].value,
              [ pseudo ]: dimension ? `${ value }${ dimension }` : value,
            },
          },
        },
      } );
    },
    [ clientId, attributes ],
  );

  return {
    handleSimpleAttributesChange,
    handleAttributesWithDeviceChange,
    handlePseudoClassesAttrChange,
    attributes,
  };
}
