"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getUsers() {
    const user = await currentUser();

    console.log('ROL ENCONTRADO:', user?.publicMetadata?.role);

    // Verificación de seguridad usando currentUser
    if (user?.publicMetadata?.role !== 'admin') {
        return [];
    }

    const client = await clerkClient();

    try {
        const users = await client.users.getUserList({
            orderBy: "-created_at",
            limit: 50,
        });

        return users.data.map((u) => ({
            id: u.id,
            name: `${u.firstName} ${u.lastName}`,
            email: u.emailAddresses[0]?.emailAddress,
            imageUrl: u.imageUrl,
            role: (u.publicMetadata.role as string) || "seller",
            lastActiveAt: u.lastActiveAt,
        }));
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export async function updateUserRole(userId: string, newRole: "admin" | "seller") {
    const user = await currentUser();

    // Verificación de seguridad
    if (user?.publicMetadata?.role !== 'admin') {
        return { success: false, message: "No tienes permisos" };
    }

    const client = await clerkClient();

    try {
        await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: newRole,
            },
        });

        revalidatePath("/users");
        return { success: true, message: `Rol actualizado a ${newRole}` };
    } catch (error) {
        console.error("Error updating role:", error);
        return { success: false, message: "Error al actualizar el rol" };
    }
}
