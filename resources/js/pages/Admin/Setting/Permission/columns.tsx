import { ColumnDef } from "@tanstack/react-table";
import { Permission } from "@/types/Admin/Setting/permisson";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Pencil, Trash } from "lucide-react";
import { destroy, edit } from "@/routes/admin/permissions";




export const columns: ColumnDef<Permission>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "guard_name",
    header: "Guard",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const permission = row.original;

      return (
        <div className="flex gap-2">
          {/* Edit */}
          <Button variant="outline" size="sm" asChild>
            <Link href={edit(permission.id)}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>

          {/* Delete */}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              if (confirm("Are you sure you want to delete this permission?")) {
                router.delete(destroy(permission.id), {
                  preserveScroll: true,
                });
              }
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
