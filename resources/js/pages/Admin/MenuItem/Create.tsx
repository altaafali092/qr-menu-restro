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
import { FoodCategory, SubFoodCategory } from "@/types/Admin/Food"
import { index, store } from "@/routes/admin/menu-items"

interface Props {
    subFoodCategories: SubFoodCategory[]
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Menu-Item", href: index().url },
    { title: "Create", href: "#" },
]

export default function MenuItemCreate({ subFoodCategories }: Props) {
    const handleCancel = () => window.history.back()

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Menu Item" />
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
                            <h1 className="text-2xl font-bold tracking-tight">Create Menu Item</h1>
                            <p className="text-muted-foreground">
                                Add a new menu item to your restaurant menu.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-4xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Menu Item Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form
                                action={store().url}
                                method="post"
                                className="space-y-6"
                                encType="multipart/form-data"
                            >
                                {({ errors }) => (
                                    <>
                                        {/* Two column grid for main fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Parent Category */}
                                            <div className="space-y-2">
                                                <Label htmlFor="sub_food_category_id">
                                                    Category <span className="text-red-500">*</span>
                                                </Label>
                                                <select
                                                    id="sub_food_category_id"
                                                    name="sub_food_category_id"
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                                >
                                                    <option value="">Select Category</option>
                                                    {subFoodCategories.map((subCategory) => (
                                                        <option key={subCategory.id} value={subCategory.id}>
                                                            {subCategory.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors?.sub_food_category_id && (
                                                    <div className="text-red-500 text-xs">{errors.sub_food_category_id}</div>
                                                )}
                                            </div>

                                            {/* Name */}
                                            <div className="space-y-2">
                                                <Label htmlFor="name">
                                                    Item Name <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="e.g., Chicken Burger"
                                                />
                                                {errors?.name && (
                                                    <div className="text-red-500 text-xs">{errors.name}</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price and Images row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Price */}
                                            <div className="space-y-2">
                                                <Label htmlFor="price">
                                                    Price <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="price"
                                                    name="price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="e.g., 120.00"
                                                />
                                                {errors?.price && (
                                                    <div className="text-red-500 text-xs">{errors.price}</div>
                                                )}
                                            </div>

                                            {/* Images */}
                                            <div className="space-y-2">
                                                <Label htmlFor="image">Images</Label>
                                                <Input
                                                    id="image"
                                                    type="file"
                                                    name="image[]"
                                                    multiple
                                                    accept="image/*"
                                                />
                                                <p className="text-xs text-muted-foreground">
                                                    Select multiple images (optional)
                                                </p>
                                            </div>
                                        </div>

                                        {/* Description - full width */}
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                placeholder="Describe your menu item (optional)"
                                                className="min-h-20"
                                            />
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-2 pt-4">
                                            <Button type="submit">Create Item</Button>
                                            <Button type="button" variant="outline" onClick={handleCancel}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}