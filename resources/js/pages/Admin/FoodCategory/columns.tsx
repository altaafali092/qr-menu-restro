import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link, router } from "@inertiajs/react";
import { Pencil, Trash } from "lucide-react";
import { FoodCategory } from "@/types/Admin/Food";
import { destroy, edit } from "@/routes/admin/food-categorys";




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
                    className="h-32 w-32 object-cover rounded"
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
        header: "status",
        cell: ({row})=>{
            const foodCategory=row.original;
            return(
                <div>
                    hello
                </div>
            )
        }
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

                    {/* Delete */}
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
