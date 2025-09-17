import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Pencil, ScanEye, Trash } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Order } from "@/types/Admin/order";
import { destroy, edit, show } from "@/routes/admin/orders";






export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const images = row.getValue("image") as string | string[];
            const image = Array.isArray(images)
                ? images[Math.floor(Math.random() * images.length)]
                : images;

            return image ? (
                <img src={image} alt={row.getValue("name")} className="h-20 w-20 object-cover rounded" />
            ) : (
                <div className="h-20 w-20 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                </div>
            );
        },
    },

    {
        accessorKey: "name",
        header: "Title",
    },
    {
        accessorKey: "sub_food_category.name",
        header: "Sub Food Category",
        cell: ({ row }) => row.original.table?.name ?? "-",
    },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: ({ row }) => {
    //         const menuItem = row.original;
    //         const updateToggle = () => {
    //             router.get(updateStatus(menuItem.id), {}, { preserveScroll: true });
    //         };

    //         return (
    //             <div className="flex items-center gap-2">
    //                 <Switch
    //                     checked={menuItem.status}
    //                     onCheckedChange={updateToggle}
    //                 />
    //                 <span
    //                     className={`text-sm font-medium ${menuItem.status ? "text-green-600" : "text-red-600"
    //                         }`}
    //                 >
    //                     {menuItem.status ? "Active" : "Inactive"}
    //                 </span>
    //             </div>
    //         );
    //     },
    // },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const menuItem = row.original;

            return (
                <div className="flex gap-2">
                    {/* Edit */}
                    <Button variant="outline" size="sm" asChild>
                        <Link href={edit(menuItem.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={show(menuItem.id)}>
                            <ScanEye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this Food Category?")) {
                                router.delete(destroy(menuItem.id), {
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
