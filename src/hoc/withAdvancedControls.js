import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { useDeviceTab } from '../hooks/useDeviceTab';
import { useClientID } from '../hooks/useClientID';
import useBlockAttributes from '../hooks/useBlockAttributes';
import { useSelect } from '@wordpress/data';
import { usePseudoTab } from '../hooks/usePseudoTab';

const { useMemo, useEffect } = wp.element;
/**
 *
 * @return {Function} Add editor and block attributes to base Gutenberg controls as props
 *  */
const withAdvancedControls = createHigherOrderComponent(
  ( WrappedComponent ) => ( props ) => {
    const { name: device } = useDeviceTab();
    const { name: pseudoClass } = usePseudoTab();

    const clientID = useClientID();
    const { handleAttributesWithDeviceChange, handlePseudoClassesAttrChange } = useBlockAttributes( clientID );
    const currentBlockAttributes = useSelect(
      ( select ) => select( 'core/block-editor' ).getBlockAttributes( clientID )
    );
    const handleChange = useMemo(
      () => {
        if ( pseudoClass ) {
          return ( value ) => handlePseudoClassesAttrChange( props.attributeName, device, pseudoClass, value, props.dimension );
        }
        return ( value ) => handleAttributesWithDeviceChange( props.attributeName, device, value, props.dimension );
      },
      [ pseudoClass, device, props.attributeName, props.dimension, handlePseudoClassesAttrChange, handleAttributesWithDeviceChange ],
    );

    const value = pseudoClass
      ? currentBlockAttributes[ props.attributeName ][ device ]?.value[pseudoClass]
      : currentBlockAttributes[ props.attributeName ][ device ]?.value;

    return (
      <WrappedComponent
        { ...props }
        value={ value }
        onChange={ handleChange }
      />
    );
  },
  'withAdvancedControls'
);

export default withAdvancedControls;
