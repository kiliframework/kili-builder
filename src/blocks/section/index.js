import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import './parent';
import './style.editor.scss';

import attributes from './attributes';

registerBlockType( 'kili/row-section', {
  title: __( 'kili-Columns', 'kili-builder' ),
  parent: [ 'kili/k-section' ],
  category: 'kili-builder',
  icon: 'grid-view',
  supports: {
    html: false,
    reusable: false,
  },
  attributes,
  keywords: [ __( 'Row', 'kili-builder' ), __( 'Kili', 'kili-builder' ) ],
  edit,
  save,
} );
