module.exports = {
  all: color => [
    `text-${color}-500`,
    `hover:bg-${color}-trans`,
    `bg-${color}-trans`,
    `hover:bg-${color}-transDark`,
    "dark:text-gray-600",
    "dark:text-gray-300"
  ]
};
