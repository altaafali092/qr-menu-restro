import React from "react"
import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Image as ImageIcon, FileText, DollarSign, Tag, Eye } from "lucide-react"
import { type BreadcrumbItem } from "@/types"
import { MenuItem } from "@/types/Admin/Food"
import { index } from "@/routes/admin/menu-items"

interface Props {
  menuItem: MenuItem
}

export default function MenuItemView({ menuItem }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Menu Items", href: index().url },
    { title: menuItem.name, href: "#" },
  ]
  console.log(menuItem)
  const handleCancel = () => window.history.back()

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`View ${menuItem.name}`} />

      <div className="container mx-auto py-8 px-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-start space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="flex-shrink-0 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold tracking-tight text-gray-400">
                  {menuItem.name}
                </h1>

              </div>
              <p className="text-gray-600 text-lg">
                Menu item gallery and details
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery Section - Full Width */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
              Image Gallery
              {menuItem.image && menuItem.image.length > 0 && (
                <Badge variant="outline" className="ml-2">
                  {menuItem.image.length} {menuItem.image.length === 1 ? 'image' : 'image'}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {menuItem.image && menuItem.image.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {menuItem.image.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                      <img
                        src={img}
                        alt={`${menuItem.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No images available</p>
                  <p className="text-gray-400 text-sm mt-1">Add images to showcase this menu item</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Item Name */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Item Name
                </h3>
                <p className="text-xl font-semibold text-gray-400">
                  {menuItem.name}
                </p>
              </div>

              <Separator />

              {/* Price */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  <DollarSign className="inline h-4 w-4 mr-1" />
                  Price
                </h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-green-600">
                    ${menuItem.price}
                  </span>
                  <span className="text-gray-500 text-sm">per item</span>
                </div>
              </div>

              <Separator />

              {/* Status */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Availability Status
                </h3>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full ${menuItem.status ? "bg-emerald-500" : "bg-red-500"
                      }`}
                  />
                  <span
                    className={`font-semibold ${menuItem.status ? "text-emerald-700" : "text-red-700"
                      }`}
                  >
                    {menuItem.status ? "Available" : "Unavailable"}
                  </span>
                  <span className="text-gray-500 text-sm">
                    • {menuItem.status ? "Ready to order" : "Not available for order"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category & Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Tag className="h-5 w-5 mr-2 text-blue-600" />
                Details & Category
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Category
                </h3>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  <Tag className="h-3 w-3 mr-1" />
                  {menuItem.sub_food_category?.name}
                </div>
          
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Description
                </h3>
                {menuItem.description ? (
                  <p className="text-gray-600 leading-relaxed">
                    {menuItem.description}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">No description provided</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}