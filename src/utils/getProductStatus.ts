export function getProductStatus(stock: number) {
  if (stock <= 0) return "OutOfStock";
  if (stock < 50) return "LowStock";
  return "InStock";
}
