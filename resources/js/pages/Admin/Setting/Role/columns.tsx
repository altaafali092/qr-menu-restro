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

            if (role.permissions && role.permissions.length > 0) {
                const permissionNames = role.permissions.map(p => p.name);
                const chunks = [];

                // Split permissions into chunks of 4
                for (let i = 0; i < permissionNames.length; i += 4) {
                    chunks.push(permissionNames.slice(i, i + 4));
                }

                return (
                    <div className="space-y-1">
                        {chunks.map((chunk, index) => (
                            <div key={index}>
                                {chunk.join(", ")}
                            </div>
                        ))}
                    </div>
                );
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
