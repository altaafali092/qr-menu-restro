import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Eye, Pencil, ScanEye, Trash } from "lucide-react";
import { FoodCategory } from "@/types/Admin/Food";
import { destroy, edit, show, updateStatus } from "@/routes/admin/food-categorys";
import { Switch } from "@/components/ui/switch";




export const columns: ColumnDef<FoodCategory>[] = [
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue("image") as string;
            return image ? (
                <img
                    src={image}
                    alt={row.getValue("name")}
                    className="h-20 w-20 object-fill rounded"
                />
            ) : (
                <div className="h-32 w-32 rounded bg-gray-200" />
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
            const foodCategory = row.original;
            const updateToggle = () => {
                router.get(updateStatus(foodCategory.id), {}, { preserveScroll: true });
            };

            return (
                <div className="flex items-center gap-2">
                    <Switch
                        checked={foodCategory.status}
                        onCheckedChange={updateToggle}
                    />
                    <span
                        className={`text-sm font-medium ${foodCategory.status ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {foodCategory.status ? "Active" : "Inactive"}
                    </span>
                </div>
            );
        },
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const foodCategory = row.original;

            return (
                <div className="flex gap-2">
                    {/* Edit */}
                    <Button variant="outline" size="sm" asChild>
                        <Link href={edit(foodCategory.id)}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={show(foodCategory.id)}>
                            <ScanEye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this Food Category?")) {
                                router.delete(destroy(foodCategory.id), {
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
