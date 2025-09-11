import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem, type PaginatedData } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import useFlashToast from '@/components/useFlashToast';
import { FoodCategory, SubFoodCategory } from '@/types/Admin/Food';
import { ServerPagination } from '@/components/ServerPagination';
import { create, index } from '@/routes/admin/sub-food-categories';

interface Props {
    subFoodCategories: PaginatedData<SubFoodCategory>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sub-Food-Categories',
        href: index().url,
    },
];

export default function SubFoodCategoryIndex({ subFoodCategories }: Props) {
    useFlashToast()
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Food-Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Sub Food Categories</h1>
                        <p className="text-muted-foreground">
                            Manage application Sub Food Categories and access controls.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create().url} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create sub Category
                        </Link>
                    </Button>
                </div>

                {/* Data Table */}
                <div className="flex-1">
                    <div className="container mx-auto py-10">
                        <DataTable columns={columns} data={subFoodCategories.data} />
                        <ServerPagination
                            page={subFoodCategories.current_page}
                            lastPage={subFoodCategories.last_page}
                            total={subFoodCategories.total}
                            from={subFoodCategories.from}
                            to={subFoodCategories.to}
                            links={subFoodCategories.links}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
