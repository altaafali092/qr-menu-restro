import React from "react"
import { Head, Form } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { type BreadcrumbItem } from "@/types"
import { index, store, update, } from "@/routes/admin/food-categorys"
import { FoodCategory } from "@/types/Admin/Food"



interface FoodCategoryProps {
    foodCategory: FoodCategory
}
const breadcrumbs: BreadcrumbItem[] = [
    { title: "Food-Categories", href: index().url },
    { title: "Edit", href: "#" },
]

export default function FoodCategoryCreate({ foodCategory }: FoodCategoryProps) {

    const handleCancel = () => window.history.back()

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Food Category" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Update Food Category</h1>
                            <p className="text-muted-foreground">
                                Update food category with image and description.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Category Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form
                                action={update(foodCategory.id).url}
                                method="post"
                                className="space-y-6"
                            >
                                <input type="hidden" name="_method" value="put" />
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Category Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        defaultValue={foodCategory.name}
                                        placeholder="e.g., Beverages"
                                    />
                                </div>

                                {/* Image */}
                                <div className="space-y-2">
                                    <Label htmlFor="image">Image</Label>
                                    <Input id="image" type="file" name="image" />
                                    {foodCategory.image && (
                                        <img
                                            src={foodCategory.image}
                                            alt={foodCategory.name}
                                            className="mt-2 h-20 w-20 rounded object-cover"
                                        />
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={foodCategory.description || ""}
                                        placeholder="Optional description"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 pt-4">
                                    <Button type="submit">Save</Button>
                                    <Button type="button" variant="outline" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}
