
import { getUsers } from "@/app/actions/users";
import { UserRoleSelect } from "@/components/users/UserRoleSelect";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
    const user = await currentUser();

    // Protección de ruta usando el backend real para evitar problemas de sincronización de claims
    if (user?.publicMetadata?.role !== "admin") {
        redirect("/");
    }

    const users = await getUsers();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h2>
                <p className="text-muted-foreground">
                    Administra los roles y accesos de los miembros del equipo.
                </p>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Avatar</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Última Actividad</TableHead>
                            <TableHead>Rol y Acceso</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={user.imageUrl} />
                                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.lastActiveAt
                                        ? new Date(user.lastActiveAt).toLocaleDateString()
                                        : "N/A"}
                                </TableCell>
                                <TableCell>
                                    <UserRoleSelect
                                        userId={user.id}
                                        currentRole={user.role}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
