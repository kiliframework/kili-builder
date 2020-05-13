import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import classnames from 'classnames';

import Inspector from './inspector';
import { editClassCreator } from '../utils/editClassCreator';
import { DESKTOP } from '../../constants';
import withStyles from '../../hoc/withStyles';
import styles from './style';

function ContainerEdit( props ) {
  const { attributes, isSelected } = props;
  const { opacity,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    backgroundColor, maxWidth, fullWidth, uniqueClassName, ...rest } = attributes;

  return (
    <>
      <Inspector { ...props } />
      <div className={ classnames( 'kili-container', uniqueClassName ) } >
        <div
          style={
            editClassCreator( {
              opacity,
              backgroundImage,
              backgroundSize,
              backgroundPosition,
              backgroundColor,
            } ) }
          className="kili-container__overlay" />
        <InnerBlocks renderAppender={ InnerBlocks.ButtonBlockAppender } />
      </div>
    </>
  );
}

export default compose(
  withStyles( styles ),
)( ContainerEdit );
