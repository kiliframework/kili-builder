import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import edit from './edit';
import save from './save';
import './parent';
import './style.editor.scss';

import attributes from './attributes';

registerBlockType( 'kili/row-section', {
  title: __( 'kili-Columns', 'kili-builder' ), //MUST
  parent: [ 'kili/k-section' ],
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
