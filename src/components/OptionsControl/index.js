/**
 * WordPress dependencies
 */
import {
  BaseControl,
  Button,
  ButtonGroup,
  PanelRow,
  Tooltip,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './editor.scss';

const NONE_OPTION = {
  value: 0,
  label: __( 'None', 'kili-builder' ),
  tooltip: __( 'None', 'kili-builder' ),
};

export default function OptionsControl( {
  currentOption,
  label,
  onChange,
  options,
  showIcons,
  showNoneOption,
} ) {
  let buttons = options;
  if ( showNoneOption ) {
    buttons = [ NONE_OPTION, ...buttons ];
  }

  return (
    <BaseControl label={ label }>
      <PanelRow>
        <ButtonGroup>
          { buttons.map( ( option ) => (
            <Tooltip
              key={ `option-${ option.value }` }
              text={ option.tooltip }>
              <Button
                className="options-control-button"
                isLarge
                isPrimary={ currentOption === option.value }
                onClick={ () => onChange( option.value ) }>
                { showIcons ? option.icon : option.label }
              </Button>
            </Tooltip>
          ) ) }
        </ButtonGroup>
      </PanelRow>
    </BaseControl> );
}

