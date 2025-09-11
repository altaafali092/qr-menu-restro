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
import { index, update } from "@/routes/admin/sub-food-categories"
import { FoodCategory, SubFoodCategory } from "@/types/Admin/Food"

interface Props {
    foodCategories: FoodCategory[]
    subFoodCategory: SubFoodCategory
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Sub-Food-Categories", href: index().url },
    { title: "Edit", href: "#" },
]

export default function SubFoodCategoryEdit({ foodCategories, subFoodCategory }: Props) {
    const handleCancel = () => window.history.back()

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${subFoodCategory.name}`} />
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
                            Back to
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Edit Sub Food Category
                            </h1>
                            <p className="text-muted-foreground">
                                Update the details of this sub category.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-4xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form
                                action={update(subFoodCategory.id).url}
                                method="post"
                                className="space-y-6"
                                encType="multipart/form-data"
                            >
                                {/* Spoof PUT */}
                                <input type="hidden" name="_method" value="put" />

                                {/* Two column grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Parent Category */}
                                    <div className="space-y-2">
                                        <Label htmlFor="food_category_id">Parent Category</Label>
                                        <select
                                            id="food_category_id"
                                            name="food_category_id"
                                            defaultValue={subFoodCategory.food_category_id ?? ""}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        >
                                            <option value="">Select Category</option>
                                            {foodCategories?.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Sub Category Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            defaultValue={subFoodCategory.name}
                                        />
                                    </div>
                                </div>

                                {/* Image - full width with preview */}
                                <div className="space-y-2">
                                    <Label htmlFor="image">Image</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                        <div>
                                            <Input id="image" type="file" name="image" accept="image/*" />
                                        </div>
                                        <div>
                                            {subFoodCategory.image && (
                                                <img
                                                    src={subFoodCategory.image}
                                                    alt={subFoodCategory.name}
                                                    className="h-20 w-20 rounded-md object-cover border"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Description - full width */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={subFoodCategory.description ?? ""}
                                        className="min-h-20"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 pt-4">
                                    <Button type="submit">Update</Button>
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