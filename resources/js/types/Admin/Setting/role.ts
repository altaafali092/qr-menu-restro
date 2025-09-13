import { User } from "@/types"
import { Permission } from "./permisson"

export type Role= {
    id: number,
    name: string,
    guard_name: string,
    created_at: string,
    updated_at: string,
    permissions: Permission[],
}
export interface RoleWithPermissions extends Role {
    permissions: Permission[] 
}
export interface RoleWithPermissionsAndUsers extends RoleWithPermissions {
    users: User[]
}