module.exports = {
  all: color => [
    `bg-${color}-50`,
    `bg-${color}-700`,
    `hover:bg-${color}-transLight`,
    `hover:${color}-900`
  ]
};
