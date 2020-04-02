export const valueSetter = (obj, device, value) => ({
  ...obj,
  [device]: {
    ...obj[device],
    value,
  }
})