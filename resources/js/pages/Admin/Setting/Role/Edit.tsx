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
import { index, update } from "@/routes/admin/roles";
import { Permission } from "@/types/Admin/Setting/permisson";
import { Role } from "@/types/Admin/Setting/role";

interface PageProps {
    role: Role;
    permissions: Permission[];
    hasPermissions: string[];
}

const EditRole = () => {
    const { role, permissions, hasPermissions } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Role", href: index().url },
        { title: `Edit (${role.name})`, href: "#" },
    ];

    const handleCancel = () => window.history.back();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Role - ${role.name}`} />
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
                            Back Test
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Edit Role - {role.name}
                            </h1>
                            <p className="text-muted-foreground">
                                Update role details and permissions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Role Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form
                                action={update(role.id).url}
                                method="post"
                                className="space-y-6"
                            >
                                {/* Spoof PUT method for update */}
                                <input type="hidden" name="_method" value="put" />

                                {/* Role Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Role Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        defaultValue={role.name}
                                        placeholder="Enter role name"
                                    />
                                </div>

                                {/* Permissions */}
                                <div className="space-y-2">
                                    <Label>Assign Permissions</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {permissions.map((permission) => (
                                            <div key={permission.id} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`permission-${permission.id}`}
                                                    name="permission[]"
                                                    value={permission.name}
                                                    defaultChecked={hasPermissions.includes(permission.name)}
                                                />
                                                <Label htmlFor={`permission-${permission.id}`}>
                                                    {permission.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                {/* Form Buttons */}
                                <div className="flex gap-2 pt-4">
                                    <Button type="submit">Update Role</Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditRole;
