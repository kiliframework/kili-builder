import { registerBlockType } from '@wordpress/blocks';import BackgroundAttributes from '../../components/Background/BackgroundAttributes';
import DimensionAttributes from '../../components/DimensionsControl/attributes';
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';
import attributes from './attributes';

registerBlockType( 'kili/k-column', {
  title: __( 'Kili-Column', 'kili-builder' ),
  parent: [ 'kili/k-section' ],
  category: 'kili-builder',
  attributes,
  supports: {
    align: true,
    align: [ 'left', 'center', 'right' ],
  },
  icon: 'columns',
  keywords: [ __( 'Column', 'kili-builder' ), __( 'Kili', 'kili-builder' ) ],
  edit,
  save,
} );
