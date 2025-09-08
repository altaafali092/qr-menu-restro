import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {  CookingPot, LayoutGrid, LucideSettings2, Shield, UserCheck, UserPlus } from 'lucide-react';
import AppLogo from './app-logo';

import { dashboard } from '@/routes/admin';
import { index as permissionsIndex } from '@/routes/admin/permissions';
import { index as rolesIndex } from '@/routes/admin/roles';
import { index as usersIndex } from '@/routes/admin/users';
import{index as foodCategoryIndex} from '@/routes/admin/food-categorys'





const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'FoodCategory',
        href: foodCategoryIndex(),
        icon: CookingPot,
    },
    {
        title: "Settings",
        href: "#",
        icon: LucideSettings2,
        items:[
            {
                title: "Permissions",
                href: permissionsIndex(),
                icon: Shield
            },
            {
                title: "Roles",
                href: rolesIndex(),
                icon: UserCheck
            },
            {
                title: "Users",
                href: usersIndex(),
                icon: UserPlus
            }
        ]
    }
];



export function AppSidebar() {

    return (

        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
