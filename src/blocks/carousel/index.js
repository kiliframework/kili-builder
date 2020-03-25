import { registerBlockType } from "@wordpress/blocks";
import attributes from './attributes';
import edit from './edit';
import save from './save';
import { __ } from "@wordpress/i18n";

registerBlockType( 'kili/carousel', {
  attributes,
  category: 'kili-builder',
  icon: 'editor-insertmore',
  edit,
  save,
  title: __( 'Kili Carousel', 'kili-builder' ),
  description: __( 'Creates a carousel block', 'kili-builder' ),
} );