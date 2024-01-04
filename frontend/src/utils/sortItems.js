export default function sortItems(docs, field, order, timestamps = false) {
  const sortOrder = order === "desc" ? -1 : 1;

  return docs.slice().sort((a, b) => {
    const valueA = timestamps ? new Date(a[field]) : a[field];
    const valueB = timestamps ? new Date(b[field]) : b[field];

    return timestamps
      ? sortOrder * (valueA - valueB)
      : valueA.localeCompare(valueB) * sortOrder;
  });
}
