export const valueSetter = ( obj, device, value, dimension ) => ( {
  ...obj,
  [ device ]: {
    ...obj[ device ],
    value: `${ value }${ dimension || '' }`,
  },
} );
