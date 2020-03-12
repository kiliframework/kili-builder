import { InnerBlocks } from '@wordpress/block-editor';
import Inspector from './inspector';

export default function ContainerEdit( props ) {
  const { attributes } = props;
  const { maxWidth, minHeight } = attributes;
  return (
    <>
      <Inspector { ...props } />
      <div style={ {
        minHeight: minHeight.desktop.value,
        maxWidth: maxWidth.desktop.value,
      } }>
        <InnerBlocks renderAppender={ InnerBlocks.ButtonBlockAppender } />
      </div>
    </>
  );
}
