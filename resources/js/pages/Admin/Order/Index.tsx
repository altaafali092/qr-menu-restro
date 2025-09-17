import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem, type PaginatedData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import useFlashToast from '@/components/useFlashToast';
import { ServerPagination } from '@/components/ServerPagination';
import { Order } from '@/types/Admin/order';
import { create, index } from '@/routes/admin/orders';


interface Props {
    orders: PaginatedData<Order>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: index().url,
    },
];

export default function OrderIndex({ orders }: Props) {
    useFlashToast()
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Order List</h1>
                        <p className="text-muted-foreground">
                            Manage application Orders and access controls.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create Order
                        </Link>
                    </Button>
                </div>

                {/* Data Table */}
                <div className="flex-1">
                    <div className="container mx-auto py-10">
                        <DataTable columns={columns} data={orders.data} />
                        <ServerPagination
                            page={orders.current_page}
                            lastPage={orders.last_page}
                            total={orders.total}
                            from={orders.from}
                            to={orders.to}
                            links={orders.links}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
