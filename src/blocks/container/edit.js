import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import classnames from 'classnames';

import Inspector from './inspector';
import { editClassCreator } from '../utils/editClassCreator';
import { DESKTOP } from '../../constants';
import withStyles from '../../hoc/withStyles';
import styles from './style';
import withClientID from '../../hoc/withClientID';

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
  withStyles( styles ),
)( ContainerEdit );
