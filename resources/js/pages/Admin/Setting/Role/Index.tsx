import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {  BreadcrumbItem, PaginatedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { ServerPagination } from '../../../../components/ServerPagination';
import { create, index } from '@/routes/admin/roles';
import { DataTable } from '@/components/data-table';
import { Role } from '@/types/Admin/Setting/role';
import { columns } from './columns';
import useFlashToast from '@/components/useFlashToast';

interface RoleProps {
    roles: PaginatedData<Role>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: index().url,
    },
];

export default function RoleIndex() {
    const { roles } = usePage<{ roles: RoleProps }>().props
    useFlashToast()
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Roles</h1>
                        <p className="text-muted-foreground">
                            Manage application Roles and access controls.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create Role
                        </Link>
                    </Button>
                </div>

                {/* Data Table */}
                <div className="flex-1">
                    <div className="container mx-auto py-10">
                        <DataTable columns={columns} data={roles.data} />
                        <ServerPagination
                            page={roles.current_page}
                            lastPage={roles.last_page}
                            total={roles.total}
                            from={roles.from}
                            to={roles.to}
                            links={roles.links}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
