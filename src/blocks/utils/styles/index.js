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
