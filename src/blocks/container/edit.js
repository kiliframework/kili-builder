import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import classnames from 'classnames';

import Inspector from './inspector';
import withStyles from '../../hoc/withStyles';
import styles from './style';
import withClientID from '../../hoc/withClientID';
import withUniqueClassName from '../../hoc/withUniqueClassName';

function ContainerEdit( props ) {
  const { attributes } = props;
  const { uniqueClassName } = attributes;

  return (
    <>
      <Inspector { ...props } />
      <div className={ classnames( 'kili-container', uniqueClassName ) } >
        <div className="kili-container__overlay" />
        <InnerBlocks renderAppender={ InnerBlocks.ButtonBlockAppender } />
      </div>
    </>
  );
}

export default compose(
  withClientID,
  withUniqueClassName,
  withStyles( styles ),
)( ContainerEdit );
