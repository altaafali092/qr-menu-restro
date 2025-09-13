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
import { index, store } from "@/routes/admin/tables"





const breadcrumbs: BreadcrumbItem[] = [
  { title: "Tables", href: index().url },
  { title: "Create", href: "#" },
]

export default function TableCreate() {

  const handleCancel = () => window.history.back()

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Food Category" />
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
              <h1 className="text-2xl font-bold tracking-tight">Create Table</h1>
              <p className="text-muted-foreground">
                Add a new table with Qr code and description.
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
                action={store().url}
                method="post"
                className="space-y-6"
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Table Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g., Beverages"
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
