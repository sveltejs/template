export default function sort(data, col, asc) {
  if (!col) return data;

  if (col.sort) return col.sort(data);

  const sorted = data.sort((a, b) => {
    const valA = col.value ? col.value(a) : a[col.field];
    const valB = col.value ? col.value(b) : b[col.field];

    const first = asc ? valA : valB;
    const second = asc ? valB : valA;

    if (typeof valA === "number") {
      return first - second;
    }

    return ("" + first).localeCompare(second);
  });

  return sorted;
}
