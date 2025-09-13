import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem, type PaginatedData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import useFlashToast from '@/components/useFlashToast';

import { ServerPagination } from '@/components/ServerPagination';
import { Table } from '@/types/Admin/table';
import { create, index } from '@/routes/admin/tables';

interface Props {
    tables: PaginatedData<Table>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tables',
        href: index().url,
    },
];

export default function FoodCategoryIndex({ tables }: Props) {
    useFlashToast()
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tables" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Food Categories</h1>
                        <p className="text-muted-foreground">
                            Manage application Food Categories and access controls.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create Category
                        </Link>
                    </Button>
                </div>

                {/* Data Table */}
                <div className="flex-1">
                    <div className="container mx-auto py-10">
                        <DataTable columns={columns} data={tables.data} />
                        <ServerPagination
                            page={tables.current_page}
                            lastPage={tables.last_page}
                            total={tables.total}
                            from={tables.from}
                            to={tables.to}
                            links={tables.links}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
