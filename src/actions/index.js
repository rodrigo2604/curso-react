export const turnOn = payload => ({
  type: 'ON',
  payload,
});

export const turnOff = () => ({
  type: 'OFF',
});
