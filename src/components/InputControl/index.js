/**
 * WordPress dependencies
 */
import {
  BaseControl,
  TextControl,
  PanelRow,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './editor.scss';

const NONE_OPTION = {
  value: 0,
  label: __( 'None', 'kili-builder' ),
  tooltip: __( 'None', 'kili-builder' ),
};

export default function InputControl( { label, ...rest } ) {
  return (
    <BaseControl label={ label }>
      <PanelRow>
        <TextControl { ...rest } />
      </PanelRow>
    </BaseControl> );
}

