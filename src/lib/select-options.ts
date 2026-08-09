export const toSelectOptions = (values: string[]) =>
  values.map((value) => ({
    value,
    label: value
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  }));