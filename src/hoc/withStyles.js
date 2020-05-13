import { createHigherOrderComponent } from '@wordpress/compose';
import BlockStyles from '../components/BlockStyles/BlockStyles';

const withStyles = ( styleFunction, options = {} ) => createHigherOrderComponent(
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
