import { useSelect } from '@wordpress/data';
import { useClientID } from './useClientID';

export default function useBlockAttributes( ) {
  const { clientID } = useClientID();
  const { attributes } = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientID ) );

  return { attributes };
}
