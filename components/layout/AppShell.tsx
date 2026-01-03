"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppShellProps {
    children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-sidebar md:flex">
                <Sidebar className="border-none" />
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
