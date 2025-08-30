import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const page = usePage();

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = page.url.startsWith(typeof item.href === 'string' ? item.href : item.href.url);

          // If item has children, use collapsible
          if (item.items && item.items.length > 0) {
            return (
              <SidebarMenuItem key={item.title}>
                <Collapsible defaultOpen={isActive}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={{ children: item.title }}>
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2">
                          {item.icon && <item.icon />}
                          {item.title}
                        </span>
                        <span>▾</span>
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="pl-4 mt-1">
                      {item.items.map((child) => (
                        <SidebarMenuItem key={child.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(typeof child.href === 'string' ? child.href : child.href.url)}
                            tooltip={{ children: child.title }}
                          >
                            <Link href={child.href} className="flex items-center gap-2">
                              {child.icon && <child.icon />}
                              {child.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            );
          }

          // Render normal menu item if no children
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={{ children: item.title }}
              >
                <Link href={item.href ?? '#'} className="flex items-center gap-2">
                  {item.icon && <item.icon />}
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
