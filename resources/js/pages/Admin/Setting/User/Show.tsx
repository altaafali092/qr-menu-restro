import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/admin/users';
import { BreadcrumbItem } from '@/types';
import { User } from '@/types/Admin/Setting/user';
import { Head, Link } from '@inertiajs/react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Role } from '@/types/Admin/Setting/role';
import {
    User as UserIcon,
    Mail,
    Shield,
    Calendar,
    Edit,
    MoreVertical,
    Activity
} from 'lucide-react';

interface ShowProps {
    user: User;
    roles: Role;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: index().url,
    },
    {
        title: 'User Details',
        href: '#',
    },
];

const UserShow = ({ user }: ShowProps) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${user.name} - User Details`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header Section */}
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
                        <p className="text-muted-foreground">
                            View and manage user information and permissions.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={edit(user.id)}>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                            </Button></Link>

                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main User Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Card */}
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <UserIcon className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                                        <CardDescription className="text-base">
                                            User Profile Information
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Mail className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                                <p className="text-sm font-mono">{user.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Calendar className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                                                <p className="text-sm">
                                                    {user.created_at
                                                        ? new Date(user.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })
                                                        : 'N/A'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Activity className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Last Activity</p>
                                                <p className="text-sm">
                                                    {user.updated_at
                                                        ? new Date(user.updated_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })
                                                        : 'N/A'
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="h-5 w-5 flex items-center justify-center">
                                                <div className={`h-3 w-3 rounded-full ${user.email_verified_at ? 'bg-green-500' : 'bg-red-500'}`} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Email Status</p>
                                                <Badge variant={user.email_verified_at ? 'default' : 'destructive'} className="text-xs">
                                                    {user.email_verified_at ? 'Verified' : 'Unverified'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Information Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Additional Information</CardTitle>
                                <CardDescription>
                                    Extended user details and metadata
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-muted-foreground">User ID</span>
                                        <p className="font-mono mt-1">#{user.id}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-muted-foreground">Account Type</span>
                                        <p className="mt-1">Standard User</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Activity className="h-5 w-5" />
                                    <span>Status</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Account Status</span>
                                        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                                            Active
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Login Status</span>
                                        <Badge variant="outline">
                                            Online
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Roles & Permissions Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Shield className="h-5 w-5" />
                                    <span>Roles & Permissions</span>
                                </CardTitle>
                                <CardDescription>
                                    Assigned roles and access levels
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {user.roles && user.roles.length > 0 ? (
                                        user.roles.map((role) => (
                                            <div
                                                key={role.id}
                                                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <Shield className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{role.name}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {role.description || 'No description'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge variant="secondary" className="text-xs">
                                                    Active
                                                </Badge>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4">
                                            <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                            <p className="text-sm text-muted-foreground">No roles assigned</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                {/* Quick Actions Card */}

                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default UserShow;