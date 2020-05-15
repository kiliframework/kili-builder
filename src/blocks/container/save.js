import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';
import withStyles from '../../hoc/withStyles';
import styles from './style';

import './style.scss';

function ContainerSave( { attributes } ) {
  const { uniqueClassName } = attributes;
  return (
    <div className={ classnames( 'wp-block-kili-container', uniqueClassName ) }>
      <div className="kili-container__overlay" />
      <InnerBlocks.Content />
    </div>
  );
}

export default compose(
  withStyles( styles ),
)( ContainerSave );
