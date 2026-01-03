"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { UserButton, useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function Header() {
    const { user } = useUser();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 border-r-0">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <Sidebar />
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <SignedIn>
                    <h1 className="text-lg font-semibold">
                        Hola, {user?.firstName || "Usuario"}
                    </h1>
                </SignedIn>
                <SignedOut>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                </SignedOut>
            </div>
            <div className="flex items-center gap-4">
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button>Iniciar Sesión</Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </header>
    );
}
