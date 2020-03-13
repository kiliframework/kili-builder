import './editor.scss';

import attributes from './attributes';
import edit from './edit';
import save from './save';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'kili/container', {
  attributes,
  category: 'kili-builder',
  icon: 'editor-insertmore',
  edit,
  save,
  supports: {
    align: [ 'wide', 'full' ],
  },
  title: __( 'Kili Container', 'kili-builder' ),
  description: __( 'Creates a container element', 'kili-builder' ),
} );
