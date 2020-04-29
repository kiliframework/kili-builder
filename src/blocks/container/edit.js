import { InnerBlocks } from '@wordpress/block-editor';
import Inspector from './inspector';
import { editClassCreator } from '../utils/editClassCreator';

export default function ContainerEdit( props ) {
  const { attributes, isSelected } = props;
  const { opacity,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    backgroundColor, ...rest } = attributes;

  return (
    <>
      <Inspector { ...props } />
      <div style={ editClassCreator( rest ) } className="kili-container" >
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
