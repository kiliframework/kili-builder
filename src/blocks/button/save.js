import { RichText } from '@wordpress/block-editor';

export default function SaveButton( { attributes } ) {
  const { text } = attributes;
  return (
    <button>
      <RichText.Content
        value={ text }
      />ƒ
    </button>
  );
}
