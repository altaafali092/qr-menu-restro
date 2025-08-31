import React, { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';
import { index, update } from '@/routes/admin/permissions';
import { Permission } from '@/types/Admin/Setting/permisson';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: index().url,
    },
    {
        title: 'Edit',
        href: '#',
    },
];

interface PermissionProps {
    permission: Permission
}

export default function EditPermission({ permission }: PermissionProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission?.name || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(update(permission.id).url, {
            preserveScroll: true,
        });
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Permission" />
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
                            <h1 className="text-2xl font-bold tracking-tight">Edit Permission</h1>
                            <p className="text-muted-foreground">
                                Update permission for the application.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Permission Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Permission Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter permission name (e.g., create-users, edit-posts)"
                                        disabled={processing}
                                        autoFocus
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        Use lowercase letters, numbers, and hyphens. This should be descriptive of the action it permits.
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={processing || !data.name.trim()}
                                        className="min-w-[120px]"
                                    >
                                        {processing ? 'Updating...' : 'Update Permission'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={processing}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
