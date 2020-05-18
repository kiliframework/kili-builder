import { createHigherOrderComponent } from '@wordpress/compose';
import BlockStyles from '../components/BlockStyles/BlockStyles';

/**
 *
 * @param {Function} styleFunction Function containing styles to caller block.
 * @return {Function} Caller block with prepended <style> containing custom styles to this block.
 *  */
const withStyles = ( styleFunction ) => createHigherOrderComponent(
  ( WrappedComponent ) => ( props ) => {
    const styles = styleFunction( props );
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
