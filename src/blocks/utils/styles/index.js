import { select } from '@wordpress/data';

export const cssPropertyValueCreator = ( property, value ) => `${ property }:${ value };`;

export const stylesByDeviceAccumulator = () => ( {
  desktop: {},
  tablet: {},
  mobile: {},
} );

export const setStyleByDevice = ( stylesByDevice, device, selector, value ) => {
  stylesByDevice[ device ][ selector ] = stylesByDevice[ device ][ selector ]
    ? [ ...stylesByDevice[ device ][ selector ], value ]
    : [ value ];
};

export const withUniqueClass = ( uniqueClass ) => {
  return ( selector ) => `${ uniqueClass }${ selector }`;
};
