import { useSelect, useDispatch } from '@wordpress/data';
const { useCallback } = wp.element;

export default function useAttributeSetter( clientId ) {
  const { attributes } = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ) );
  const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

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

  return {
    handleAttributesWithDeviceChange,
  };
}
