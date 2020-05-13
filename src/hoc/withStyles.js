import { v4 as uuid } from 'uuid';
import { createHigherOrderComponent } from '@wordpress/compose';
import BlockStyles from '../components/BlockStyles/BlockStyles';

/**
 *
 * @param {Function} styleFunction Function containing styles to caller block.
 * @return {Function} Caller block with prepended <style> containing custom styles to this block.
 *  */
const withStyles = ( styleFunction ) => createHigherOrderComponent(
  ( WrappedComponent ) => ( props ) => {
    const { attributes, setAttributes } = props;
    const uniqueClassName = `kili-${ uuid().substr( 0, 7 ) }`;
    const styles = styleFunction( props );
    // Add uniqueClassName as an attribute, if the caller to this function is the Edit component of a block.
    if ( setAttributes && ! attributes.uniqueClassName ) {
      setAttributes( { uniqueClassName } );
    }
    return (
      <>
        <BlockStyles styles={ styles } />
        <WrappedComponent { ...props } />
      </>
    );
  },
  'withStyles'
);

export default withStyles;
