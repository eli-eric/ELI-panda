import { ROLES } from "types/constants/roles"

export const hasRole = (userRoles: ROLES[] | undefined, role: ROLES) => {

    return userRoles?.indexOf(role) !== -1
}