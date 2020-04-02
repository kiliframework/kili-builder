import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import edit from './edit';
import save from './save';
import attributes from './attributes';

import './style.editor.scss';

registerBlockType( 'kili/heading', {
  title: __( 'kili-Heading', 'kili-builder' ), //MUST
  category: 'kili-builder', //MUST
  icon: 'grid-view',
  supports: {
    html: false,
    reusable: false,
  },
  attributes, //MUST
  keywords: [ __( 'Row', 'kili-builder' ), __( 'Kili', 'kili-builder' ) ],
  edit, //MUST
  save, //MUST
} );
