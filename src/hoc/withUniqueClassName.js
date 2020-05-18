import { v4 as uuid } from 'uuid';
import { createHigherOrderComponent } from '@wordpress/compose';

const { useEffect } = wp.element;

/**
 *
 * @return {Function} Caller block with uniqueClassName as an attribute to identify unique instances of a block.
 *  */
const withUniqueClassName = createHigherOrderComponent(
  ( WrappedComponent ) => ( props ) => {
    const { attributes, setAttributes } = props;
    // Add uniqueClassName as an attribute to identify unique instances of a block.
    useEffect( () => {
      if ( setAttributes && ! attributes.uniqueClassName ) {
        const uniqueClassName = `kili-${ uuid().substr( 0, 7 ) }`;
        setAttributes( { uniqueClassName } );
      }
    }, [ setAttributes, attributes.uniqueClassName ] );
    return (
      <>
        <WrappedComponent { ...props } />
      </>
    );
  },
  'withUniqueClassName'
);

export default withUniqueClassName;
