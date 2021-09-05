export type CategoryName = "All" | "Art" | "Biography" | "Computers" | "History" | "Medical" | "Poetry";

export type CategoryMap<T> = Record<CategoryName, T>;