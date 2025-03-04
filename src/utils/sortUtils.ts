export interface SortOption {
  key: string;
  order: "asc" | "desc";
}

export function sortData<T>(data: T[], sortOption: SortOption): T[] {
  return [...data].sort((a, b) => {
    const valueA = a[sortOption.key as keyof T];
    const valueB = b[sortOption.key as keyof T];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOption.order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOption.order === "asc" ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });
}
