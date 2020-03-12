import { InnerBlocks } from '@wordpress/block-editor';
import Inspector from './inspector';

export default function ContainerEdit( props ) {
  return (
    <>
      <Inspector { ...props } />
      <InnerBlocks renderAppender={ InnerBlocks.ButtonBlockAppender } />
    </>
  );
}
