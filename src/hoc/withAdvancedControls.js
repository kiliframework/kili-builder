import { createHigherOrderComponent } from '@wordpress/compose';
import { useDeviceTab } from '../hooks/useDeviceTab';
import { usePseudoTab } from '../hooks/usePseudoTab';
import { isSimpleAttribute } from '../blocks/utils';
import useAttribute from '../hooks/useAttribute';

const { useMemo } = wp.element;

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
        return attribute;
      } else if ( pseudoClass ) {
        return attribute[ device ]?.value[pseudoClass];
      }
      return attribute[ device ]?.value;
    };

    return (
      <WrappedComponent
        { ...props }
        device={ device }
        pseudoClass={ pseudoClass }
        value={ getValue() }
        onChange={ handleChange }
      />
    );
  },
  'withAdvancedControls'
);

export function shouldControlRender( prevProps, nextProps ) {
  return prevProps.value === nextProps.value && prevProps.device === nextProps.device && prevProps.pseudoClass === nextProps.pseudoClass;
}

export default withAdvancedControls;
