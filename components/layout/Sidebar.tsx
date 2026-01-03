"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, Settings, Users } from "lucide-react";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    const { user } = useUser();
    const role = (user?.publicMetadata?.role as string) || "seller";

    const allItems = [
        {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            roles: ["admin"],
        },
        {
            title: "Inventario",
            href: "/inventory",
            icon: Package,
            roles: ["admin", "seller"],
        },
        {
            title: "Usuarios",
            href: "/users",
            icon: Users,
            roles: ["admin"],
        },
        {
            title: "Configuración",
            href: "/settings",
            icon: Settings,
            roles: ["admin"],
        },
    ];

    const items = allItems.filter((item) => item.roles.includes(role));

    return (
        <div className={cn("pb-12 h-full border-r bg-sidebar", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-sidebar-foreground">
                        ERP Admin
                    </h2>
                    <div className="space-y-1">
                        {items.map((item) => (
                            <Button
                                key={item.href}
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start",
                                    pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                                )}
                                asChild
                            >
                                <Link href={item.href}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
