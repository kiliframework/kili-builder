import { v4 as uuid } from 'uuid';
import { createHigherOrderComponent } from '@wordpress/compose';
import BlockStyles from '../components/BlockStyles/BlockStyles';

const withStyles = ( styleFunction, options = {} ) => createHigherOrderComponent(
  ( WrappedComponent ) => ( props ) => {
    const { attributes, setAttributes } = props;
    const uniqueClassName = `kili-${ uuid().substr( 0, 7 ) }`;
    const styles = styleFunction( props );
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
