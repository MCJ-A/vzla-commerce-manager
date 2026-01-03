"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateUserRole } from "@/app/actions/users";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UserRoleSelectProps {
    userId: string;
    currentRole: string;
}

export function UserRoleSelect({ userId, currentRole }: UserRoleSelectProps) {
    const [role, setRole] = useState(currentRole);
    const [loading, setLoading] = useState(false);

    const handleRoleChange = async (newRole: "admin" | "seller") => {
        setLoading(true);
        // Optimistic update
        setRole(newRole);

        try {
            const result = await updateUserRole(userId, newRole);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
                // Revert on failure
                setRole(currentRole);
            }
        } catch {
            toast.error("Error al actualizar el rol");
            setRole(currentRole);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Select
                value={role}
                onValueChange={(val) => handleRoleChange(val as "admin" | "seller")}
                disabled={loading}
            >
                <SelectTrigger className="w-[140px]">
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="seller">Vendedor</SelectItem>
                </SelectContent>
            </Select>
            <Badge variant={role === "admin" ? "destructive" : "default"}>
                {role === "admin" ? "Admin" : "Vendedor"}
            </Badge>
        </div>
    );
}
