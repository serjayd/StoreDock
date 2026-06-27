export const productStatusLabel = {
  InStock: "In Stock",
  OutOfStock: "Out of Stock",
  LowStock: "Low Stock",
} as const;

export const productStatusStyles = {
  InStock: "text-chart-1 bg-chart-1/20",
  LowStock: "text-chart-3 bg-chart-3/20",
  OutOfStock: "text-chart-5 bg-chart-5/20",
} as const;
