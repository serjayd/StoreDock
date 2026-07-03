"use client";

import { Button } from "@/components/ui/button";
import { deleteUser } from "@/lib/auth-client";
import { Trash, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

export default function UserDangerZone() {
  const handleDelete = async () => {
    const res = await deleteUser();

    if (res?.error) {
      toast.error(res.error.message || "Failed to delete account");
      return;
    }

    window.location.href = "/";
  };

  return (
    <section className="space-y-4">
      {/* Export Data */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="mb-2 sm:mb-0">
            <h2 className="text-sm font-semibold mb-0.5">Export your data</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Download a CSV export of all your stores, shelves, and inventory
              data.
            </p>
          </div>

          <Button type="button" variant="outline" size="lg">
            Export CSV
          </Button>
        </div>
      </div>
      {/* Delete Account */}
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
        <div className="flex items-start gap-2 mb-4">
          <div className="bg-chart-5/20 rounded-lg p-3 w-fit">
            <TriangleAlert className="size-4 text-chart-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-destructive mb-0.5">
              Delete Account
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Permanently delete your StockFlow account and all associated
              stores, shelves, and inventory. <br />
              <strong className="text-foreground">
                This cannot be undone.
              </strong>
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="destructive"
          size="lg"
          onClick={() => handleDelete()}
        >
          <Trash /> Delete Account
        </Button>
      </div>
    </section>
  );
}
