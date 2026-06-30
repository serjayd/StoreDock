import InventoryValueChart from "../charts/InventoryValueChart";
import StockStatusChart from "../charts/StockStatusChart";
import UnitsPerShelfChart from "../charts/UnitsPerShelfChart";

interface GraphsContainerProps {
  unitsPerShelf: {
    shelf: string;
    units: number;
  }[];

  stockStatus: {
    name: string;
    value: number;
  }[];

  inventoryValue: {
    shelf: string;
    value: number;
  }[];
}

export default function GraphsContainer({
  unitsPerShelf,
  stockStatus,
  inventoryValue,
}: GraphsContainerProps) {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="hidden sm:block lg:col-span-2">
          <UnitsPerShelfChart data={unitsPerShelf} />
        </div>

        <StockStatusChart data={stockStatus} />
      </div>

      <div className="mt-6">
        <InventoryValueChart data={inventoryValue} />
      </div>
    </>
  );
}
