import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Pencil, ScanEye, Trash } from "lucide-react";
import { destroy, edit, show } from "@/routes/admin/roles";
import { Role } from "@/types/Admin/Setting/role";






export const columns: ColumnDef<Role>[] = [
    {
        id: "serial",
        header: "S.N.",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "Permissions",
        header: "Permissions",
        cell: ({ row }) => {
            const role = row.original; // assuming row.original is your Role object
            // role.permissions could be an array of Permission objects
            if (role.permissions && role.permissions.length > 0) {
                return role.permissions.map(p => p.name).join(", "); // comma-separated
            }
            return "No permissions";
        }
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const role = row.original;

            return (
                <div className="flex gap-2">
                    {/* Edit */}
                    <Button variant="outline" size="sm" asChild>
                        <Link href={edit(role.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>


                    {/* Delete */}
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this permission?")) {
                                router.delete(destroy(role.id), {
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
