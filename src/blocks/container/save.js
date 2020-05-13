import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import './style.scss';
import { attrClassCreator } from '../utils';
import { DESKTOP } from '../../constants';
import { genericStylesCreator } from '../utils/styles/genericStylesCreator';
import { v4 as uuid } from 'uuid';
import { compose } from '@wordpress/compose';
import withStyles from '../../hoc/withStyles';
import styles from './style';

function ContainerSave( { attributes, uniqueClassName } ) {
  return (
    <div className={ classnames( 'wp-block-kili-container', `kili-${ attributes.uniqueID }` ) }>
      <InnerBlocks.Content />
    </div>
  );
}

export default compose(
  withStyles( styles ),
)( ContainerSave );
