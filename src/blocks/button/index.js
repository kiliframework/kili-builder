import { registerBlockType } from '@wordpress/blocks';
import { button as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import attributes from './attributes';
import edit from './edit';
import save from './save';

registerBlockType( 'kili/button', {
  attributes,
  category: 'kili-builder',
  icon,
  edit,
  save,
  title: __( 'Kili Button', 'kili-builder' ),
  description: __( 'Creates a button block', 'kili-builder' ),
} );
