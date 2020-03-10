import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import './parent';
import { InnerBlocks } from '@wordpress/block-editor';
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
  save: ( { attributes } ) => {
    return (
      <div className={ `flexgrid` }>
        <InnerBlocks.Content />
      </div>
    );
  },
} );
