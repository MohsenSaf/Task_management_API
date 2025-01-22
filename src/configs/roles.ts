interface RoleHierarchy {
  [key: string]: string[]
}

export const ROLE_HIERARCHY: RoleHierarchy = {
  ADMIN: ["USER"],
  USER: [],
}
