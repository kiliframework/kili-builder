import { __ } from '@wordpress/i18n';

export const attrOptionsBuiler = ( options ) =>
  options.map( ( [ value, label, tooltip ] ) => ( {
    value,
    label: __( label, 'kili-builder' ),
    tooltip: __( tooltip, 'kili-builder' ),
  } )
  );
