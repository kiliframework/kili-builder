import { InnerBlocks } from '@wordpress/block-editor';
import Inspector from './inspector';
import { editClassCreator } from '../utils/editClassCreator';
import { DESKTOP } from '../../constants';

export default function ContainerEdit( props ) {
  const { attributes, isSelected } = props;
  const { opacity,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    backgroundColor, maxWidth, fullWidth, ...rest } = attributes;

  const newMaxWidth = fullWidth[ DESKTOP ].value ? 'none' : maxWidth[ DESKTOP ].value;

  return (
    <>
      <Inspector { ...props } />
      <div style={ { ...editClassCreator( { ...rest } ), maxWidth: newMaxWidth } } className="kili-container" >
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
        <InnerBlocks renderAppender={ isSelected && InnerBlocks.ButtonBlockAppender } />
      </div>
    </>
  );
}
