/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
  BaseControl,
  Button,
  ButtonGroup,
  PanelRow,
  Tooltip,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const NONE_OPTION = {
  value: 0,
  label: __( 'None', 'coblocks' ),
  tooltip: __( 'None', 'coblocks' ),
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
    <BaseControl>
      <PanelRow>
        <ButtonGroup>

          { buttons.map( ( option ) => (
            <Tooltip
              key={ `option-${ option.value }` }
              text={ option.tooltip }>

              <Button
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

