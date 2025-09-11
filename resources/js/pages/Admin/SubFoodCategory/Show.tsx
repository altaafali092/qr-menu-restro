import React from "react"
import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Image as ImageIcon, FileText } from "lucide-react"
import { type BreadcrumbItem } from "@/types"
import { FoodCategory, SubFoodCategory } from "@/types/Admin/Food"
import { index } from "@/routes/admin/sub-food-categories"

interface Props {
  subFoodCategory: SubFoodCategory
  foodCategory:FoodCategory
}

export default function SubFoodCategoryView({ subFoodCategory }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Sub Food Categories", href: index().url },
    { title: subFoodCategory.name, href: "#" },
  ]

  const handleCancel = () => window.history.back()
console.log(subFoodCategory)
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`View ${subFoodCategory.name}`} />

      <div className="container mx-auto py-8 px-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-start space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {subFoodCategory.name}
              </h1>
              <p className="text-gray-600 text-lg">
                Sub food category management and details
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Category Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                {subFoodCategory.image ? (
                  <div className="relative">
                    <img
                      src={subFoodCategory.image}
                      alt={subFoodCategory.name}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No image available</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Sub Category Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Food Category
                  </h3>
                  <p className="text-xl font-medium text-gray-400">
                    {subFoodCategory.food_category_id}
                  </p>
                </div>

                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Name
                  </h3>
                  <p className="text-xl font-medium text-gray-400">
                    {subFoodCategory.name}
                  </p>
                </div>

                <Separator />

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Description
                  </h3>
                  {subFoodCategory.description ? (
                    <p className="text-gray-500 leading-relaxed">
                      {subFoodCategory.description}
                    </p>
                  ) : (
                    <p className="text-gray-400 italic">No description provided</p>
                  )}
                </div>

                <Separator />

                {/* Status */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Status
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        subFoodCategory.status ? "bg-emerald-500" : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        subFoodCategory.status
                          ? "text-emerald-700"
                          : "text-gray-600"
                      }`}
                    >
                      {subFoodCategory.status ? "Active" : "Inactive"}
                    </span>
                    <span className="text-gray-500 text-sm">
                      •{" "}
                      {subFoodCategory.status
                        ? "Visible to users"
                        : "Hidden from users"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
