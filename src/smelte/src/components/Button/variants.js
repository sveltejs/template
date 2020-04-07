module.exports = {
  all: color => [
    `bg-${color}-transDark`,
    `bg-${color}-transLight`,
    `bg-${color}-trans`,
    `bg-${color}-50`,
    `bg-${color}`,
    `text-${color}`,
    `text-${color}-500`
  ],
  normal: color => [
    `text-${color}-500`,
    `text-${color}-400`,
    `bg-${color}-500`,
    `bg-${color}-400`,
    `border-${color}-400`
  ],
  light: color => [
    `text-${color}-400`,
    `text-${color}-300`,
    `bg-${color}-400`,
    `bg-${color}-300`,
    `border-${color}-200`
  ],
  dark: color => [
    `text-${color}-900`,
    `text-${color}-800`,
    `bg-${color}-900`,
    `bg-${color}-800`,
    `border-${color}-800`
  ]
};
