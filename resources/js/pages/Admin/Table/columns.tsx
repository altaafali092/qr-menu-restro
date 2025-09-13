import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Eye, Pencil, ScanEye, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Table } from "@/types/Admin/table";
import { destroy, edit, show, updateStatus } from "@/routes/admin/tables";




export const columns: ColumnDef<Table>[] = [
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "qr_code_path",
        header: "Qr Code",
        cell: ({ row }) => {
            const table = row.original;
            const qr_code_path = row.getValue("qr_code_path") as string;
            return qr_code_path ? (
                <img
                    src={`/storage/${qr_code_path}`}
                    alt={row.getValue("name")}
                    className="h-20 w-20 object-fill rounded"
                />
            ) : (
                <div className="h-20 w-20 rounded bg-gray-200" />
            );
        },

    },


    {
        accessorKey: "name",
        header: "Title",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const table = row.original;
            const updateToggle = () => {
                router.get(updateStatus(table.id), {}, { preserveScroll: true });
            };

            return (
                <div className="flex items-center gap-2">
                    <Switch
                        checked={table.status}
                        onCheckedChange={updateToggle}
                    />
                    <span
                        className={`text-sm font-medium ${table.status ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {table.status ? "Active" : "Inactive"}
                    </span>
                </div>
            );
        },
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const table = row.original;

            return (
                <div className="flex gap-2">
                    {/* Edit */}
                    <Button variant="outline" size="sm" asChild>
                        <Link href={edit(table.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={show(table.id)}>
                            <ScanEye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this Food Category?")) {
                                router.delete(destroy(table.id), {
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
