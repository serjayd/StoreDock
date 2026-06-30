export function getProductStatus(stock: number, threshold: number) {
  if (stock <= 0) return "OutOfStock";
  if (stock <= threshold) return "LowStock";
  return "InStock";
}
