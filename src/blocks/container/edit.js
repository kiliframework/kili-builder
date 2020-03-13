import { InnerBlocks } from '@wordpress/block-editor';
import Inspector from './inspector';
import { editClassCreator } from '../utils/editClassCreator';

export default function ContainerEdit( props ) {
  const { attributes } = props;
  return (
    <>
      <Inspector { ...props } />
      <div style={ editClassCreator( attributes ) }>
        <InnerBlocks renderAppender={ InnerBlocks.ButtonBlockAppender } />
      </div>
    </>
  );
}
