import { useSelect, useDispatch } from '@wordpress/data';
import { DESKTOP } from '../constants';
import { useClientID } from './useClientID';
const { useCallback } = wp.element;

export default function useBlockAttributes( ) {
  const { clientID, setAttributes } = useClientID();
  const { attributes } = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientID ) );
  const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

  const handleSimpleAttributesChange = useCallback(
    ( attribute, value, dimension ) => {
      updateBlockAttributes( clientID, {
        ...attributes,
        [ attribute ]: dimension ? `${ value }${ dimension }` : value,
      } );
    },
    [ clientID, attributes ],
  );
  const handleAttributesWithDeviceChange = useCallback(
    ( attribute, device, value, dimension ) => {
      setAttributes( {
        [ attribute ]: {
          [ device ]: {
            value: dimension ? `${ value }${ dimension }` : value,
          },
        } } );
    },
    [ clientID, attributes ],
  );

  const handlePseudoClassesAttrChange = useCallback(
    ( attribute, device = DESKTOP, pseudo, value, dimension ) => {
      updateBlockAttributes( clientID, {
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
    [ clientID, attributes ],
  );

  return {
    handleSimpleAttributesChange,
    handleAttributesWithDeviceChange,
    handlePseudoClassesAttrChange,
    attributes,
  };
}
