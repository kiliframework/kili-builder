import { select } from '@wordpress/data';

/**
 *
 * @param {string} property Css property
 * @param {string} value Css value
 *
 * @return {string} Css property-value concatenated.
 */
export const cssPropertyValueCreator = ( property, value ) => `${ property }:${ value };`;

/**
 *
 * @return {Object} Object containing css styles by selector, separated by device
 */
export const stylesByDeviceAccumulator = () => ( {
  desktop: {},
  tablet: {},
  mobile: {},
} );

/**
 * @param {Object} stylesByDevice Reference to object containing css styles by selector, separated by device
 * @param {string} device Selected device to set value
 * @param {string} className Classname to select
 * @param {string} value Css property-value pair;
 */
export const setStyleByDevice = ( stylesByDevice, device, className, value ) => {
  const selector = `.${ className }`;
  if ( ! stylesByDevice[ device ] ) {
    return;
  }
  stylesByDevice[ device ][ selector ] = stylesByDevice[ device ][ selector ]
    ? [ ...stylesByDevice[ device ][ selector ], value ]
    : [ value ];
};

/**
 * @param {string} uniqueClass Unique class to block;
 * @return {Function} Closure with uniqueClass saved. Calling this function will
 *  return the selector passed with unique block class prepended.
 */
export const initPrependUniqueClass = ( uniqueClass ) => {
  return ( selector ) => `${ uniqueClass } .${ selector }`;
};

export const initGetValue = ( attributes ) => ( attributeName, device ) => {
  return attributes[ attributeName ][ device ]?.value;
};
