import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

import { type BreadcrumbItem } from "@/types";
import { index } from "@/routes/admin/roles";
import { Permission } from "@/types/Admin/Setting/permisson";
import { Role } from "@/types/Admin/Setting/role";

interface PageProps {
    role: Role;
    permissions: Permission[];
    hasPermissions: string[];
}

const ShowRole = () => {
    
    const { role, permissions, hasPermissions } = usePage<PageProps>().props;

    console.log("Role object:", role);
    console.log("All permissions:", permissions);
    console.log("Assigned permissions:", hasPermissions);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Roles", href: index().url },
        { title: `Show (${role.name})`, href: "#" },
    ];

    const handleBack = () => window.history.back();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Show Role - ${role.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleBack}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Role Details - {role.name}
                            </h1>
                            <p className="text-muted-foreground">
                                View role information and assigned permissions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Role Details */}
                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Role Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Role Name */}
                            <div className="space-y-2">
                                <Label>Role Name</Label>
                                <p className="rounded-md border bg-muted px-3 py-2">{role.name}</p>
                            </div>

                            {/* Assigned Permissions */}
                            <div className="space-y-2">
                                <Label>Assigned Permissions</Label>
                                {permissions?.length ? (
                                    <div className="grid grid-cols-2 gap-2">
                                        {permissions.map((permission) => (
                                            <div key={permission.id} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`permission-${permission.id}`}
                                                    checked={hasPermissions.includes(permission.name)}
                                                    disabled
                                                />
                                                <Label htmlFor={`permission-${permission.id}`}>
                                                    {permission.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="rounded-md border bg-muted px-3 py-2">
                                        No permissions assigned
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShowRole;
