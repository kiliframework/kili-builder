import { registerBlockType } from '@wordpress/blocks';
import { cover as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import attributes from './attributes';
import edit from './edit';
import save from './save';

registerBlockType( 'kili/banner', {
  attributes,
  category: 'kili-builder',
  icon,
  edit,
  save,
  title: __( 'Kili Banner', 'kili-builder' ),
  description: __( 'Creates a banner block', 'kili-builder' ),
} );
