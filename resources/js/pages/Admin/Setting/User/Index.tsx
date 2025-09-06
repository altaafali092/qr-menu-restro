import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {  BreadcrumbItem, PaginatedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { ServerPagination } from '../../../../components/ServerPagination';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { User } from '@/types/Admin/Setting/user';
import users, { create, index } from '@/routes/admin/users';
import useFlashToast from '@/components/useFlashToast';

interface UserProps {
    users: PaginatedData<User>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: index().url,
    },
];

export default function RoleIndex() {
    const { users } = usePage<{ users: UserProps }>().props
    useFlashToast()
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
                        <p className="text-muted-foreground">
                            Manage application Users and access controls.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create User
                        </Link>
                    </Button>
                </div>

                {/* Data Table */}
                <div className="flex-1">
                    <div className="container mx-auto py-10">
                        <DataTable columns={columns} data={users.data} />
                        {/* <ServerPagination
                            page={users.current_page}
                            lastPage={users.last_page}
                            total={users.total}
                            from={users.from}
                            to={users.to}
                            links={users.links}
                        /> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
