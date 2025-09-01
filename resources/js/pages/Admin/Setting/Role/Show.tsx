import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Shield, Users, Lock, CheckCircle2, XCircle } from "lucide-react";

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

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Roles", href: index().url },
        { title: `Show (${role.name})`, href: "#" },
    ];

    const handleBack = () => window.history.back();

    const assignedCount = hasPermissions.length;


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Show Role - ${role.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-8 overflow-x-auto p-4 sm:p-6">
                {/* Enhanced Header */}
                <div className="space-y-4 sm:space-y-0">
                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBack}
                                className="flex items-center gap-2 hover:bg-muted/50 self-start"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                            <div className="space-y-3 sm:space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                                            {role.name}
                                        </h1>
                                        <p className="text-sm sm:text-lg text-muted-foreground">
                                            Role Management & Permissions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats - Mobile: Full width, Desktop: Compact */}
                        <div className="flex justify-center sm:justify-end gap-6 sm:gap-3 bg-muted/30 sm:bg-transparent rounded-lg p-4 sm:p-0">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{assignedCount}</div>
                                <div className="text-xs text-muted-foreground">Assigned</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile: Stack vertically, Desktop: Grid layout */}
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-8">
                    {/* Role Information Card */}
                    <div className="lg:col-span-1">
                        <Card className="shadow-sm border-0 bg-gradient-to-br from-background to-muted/20">
                            <CardHeader className="pb-3 sm:pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                    Role Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 sm:space-y-6">
                                <div className="space-y-2 sm:space-y-3">
                                    <Label className="text-xs sm:text-sm font-medium text-muted-foreground">Role Name</Label>
                                    <div className="flex items-center gap-3 rounded-lg border bg-background/50 px-3 py-2 sm:px-4 sm:py-3">
                                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                                        <span className="font-semibold text-foreground text-sm sm:text-base truncate">{role.name}</span>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                    {/* Permissions Grid */}
                    <div className="lg:col-span-2">
                        <Card className="shadow-sm border-0 bg-gradient-to-br from-background to-muted/20">
                            <CardHeader className="pb-3 sm:pb-4">

                                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                    Review all available permissions and their assignment status
                                </p>
                            </CardHeader>
                            <CardContent>
                                {permissions?.length ? (
                                    <div className="grid grid-cols-1 gap-3">
                                        {permissions
                                            .filter((permission) => hasPermissions.includes(permission.name)) // ✅ only assigned
                                            .map((permission) => (
                                                <div
                                                    key={permission.id}
                                                    className="flex items-center gap-3 rounded-lg border p-3 sm:p-4 transition-all duration-200 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 shadow-sm"
                                                >
                                                    <Checkbox
                                                        id={`permission-${permission.id}`}
                                                        checked
                                                        disabled
                                                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 flex-shrink-0"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <Label
                                                            htmlFor={`permission-${permission.id}`}
                                                            className="text-xs sm:text-sm font-medium cursor-pointer block truncate text-green-800 dark:text-green-200"
                                                            title={permission.name}
                                                        >
                                                            {permission.name}
                                                        </Label>
                                                    </div>
                                                    <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 sm:py-12">
                                        <Lock className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 mx-auto mb-3 sm:mb-4" />
                                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                                            No Permissions Assigned
                                        </h3>
                                        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
                                            This role does not have any permissions assigned yet.
                                        </p>
                                    </div>
                                )}
                            </CardContent>

                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ShowRole;