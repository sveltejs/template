import Select from "./Select.svelte";

export default Select;

export const variants = {
  all: color => [`bg-${color}-500`, `text-${color}-500`, `border-${color}-500`]
};
