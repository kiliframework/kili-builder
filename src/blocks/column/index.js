import { registerBlockType } from '@wordpress/blocks';
import BackgroundAttributes from '../../components/Background/BackgroundAttributes';
import DimensionAttributes from '../../components/DimensionsControl/attributes';
import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import save from './save';

registerBlockType( 'kili/k-column', {
  title: __( 'Kili-Column', 'kili-builder' ),
  parent: [ 'kili/k-section' ],
  category: 'kili-builder',
  attributes: {
    columns: {
      type: 'number',
      default: 6,
    },
    currentTab: {
      type: 'string',
      default: 'desktop',
    },
    align: {
      type: 'string',
      default: '',
    },
    width: {
      type: 'string',
    },
    contentAlign: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
    },
    ...BackgroundAttributes,
    ...DimensionAttributes,
  },
  supports: {
    align: true,
    align: [ 'left', 'center', 'right' ],
  },
  icon: 'columns',
  keywords: [ __( 'Column', 'kili-builder' ), __( 'Kili', 'kili-builder' ) ],
  edit,
  save,
} );
