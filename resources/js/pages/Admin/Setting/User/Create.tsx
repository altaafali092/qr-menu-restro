import React from "react";
import { Head, Form, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

import { type BreadcrumbItem } from "@/types";
import { index, store } from "@/routes/admin/users";
import { Role } from "@/types/Admin/Setting/role";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Users", href: index().url },
    { title: "Create", href: "#" },
];

interface PageProps {
    roles: Role[];
}

export default function CreateUser() {
    const { roles } = usePage<{ roles: PageProps }>().props;

    const handleCancel = () => window.history.back();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
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
                            <h1 className="text-2xl font-bold tracking-tight">Create User</h1>
                            <p className="text-muted-foreground">
                                Create a new user and assign roles.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form action={store().url} method="post">
                                {({ errors }) => (
                                    <div className="space-y-6">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Enter full name"
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter email address"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>


                                        {/* Password */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter password"
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-red-600">{errors.password}</p>
                                            )}
                                        </div>

                                        {/* Roles */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium mt-1 mb-1">Assign Roles</Label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {roles.map((role) => (
                                                    <div key={role.id} className="flex items-center gap-2">
                                                        <Checkbox
                                                            id={`role-${role.id}`}
                                                            name="role[]"
                                                            value={role.id}
                                                        />
                                                        <Label htmlFor={`role-${role.id}`}>{role.name}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                            {errors.roles && (
                                                <p className="text-sm text-red-600">{errors.roles}</p>
                                            )}
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-2 pt-4">
                                            <Button type="submit">Create User</Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => window.history.back()}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Form>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
