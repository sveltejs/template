export const keyCodes = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  pgup: 33,
  pgdown: 34,
  enter: 13,
  escape: 27,
  tab: 9
};

export const keyCodesArray = Object.keys(keyCodes).map(k => keyCodes[k]);
