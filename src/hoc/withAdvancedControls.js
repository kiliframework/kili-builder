import { createHigherOrderComponent } from '@wordpress/compose';
import { useDeviceTab } from '../hooks/useDeviceTab';
import useBlockAttributes from '../hooks/useBlockAttributes';
import { usePseudoTab } from '../hooks/usePseudoTab';
import { isSimpleAttribute } from '../blocks/utils';
import useAttribute from '../hooks/useAttribute';

const { useMemo, useEffect } = wp.element;
/**
 *
 * @return {Function} Add editor and block attributes to base Gutenberg controls as props
 *  */
const withAdvancedControls = createHigherOrderComponent(
  ( WrappedComponent ) => ( props ) => {
    const { name: device } = useDeviceTab();
    const { name: pseudoClass } = usePseudoTab();
    const {
      attribute,
      handleAttributeWithDeviceChange,
      handleSimpleAttributesChange,
      handlePseudoClassesAttrChange,
    } = useAttribute( props.attributeName );

    const {
      attributes,

    } = useBlockAttributes();

    const simpleAttribute = isSimpleAttribute( attribute );

    const handleChange = useMemo(
      () => {
        if ( simpleAttribute ) {
          return ( value ) => handleSimpleAttributesChange( value, props.dimension );
        } else if ( pseudoClass ) {
          return ( value ) => handlePseudoClassesAttrChange( device, pseudoClass, value, props.dimension );
        }
        return ( value ) => handleAttributeWithDeviceChange( device, value, props.dimension );
      },
      [ pseudoClass, device, props.dimension, handlePseudoClassesAttrChange, handleAttributeWithDeviceChange, handleSimpleAttributesChange ],
    );

    const getValue = () => {
      if ( simpleAttribute ) {
        return attributes[ props.attributeName ];
      } else if ( pseudoClass ) {
        return attributes[ props.attributeName ][ device ]?.value[pseudoClass];
      }
      return attributes[ props.attributeName ][ device ]?.value;
    };

    useEffect( () => {
      console.log( 'handleChange attribute changed', attributes[ props.attributeName ] );
    }, [ handleAttributeWithDeviceChange ] );

    return (
      <WrappedComponent
        { ...props }
        value={ getValue() }
        onChange={ handleChange }
      />
    );
  },
  'withAdvancedControls'
);

export default withAdvancedControls;
