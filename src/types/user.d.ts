enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}

type User = {
  id: number
  username: string
  email: string
  role: ROLE
  createdAt: Date
  updatedAt: Date
}
