enum ROLE {
  ADMIN,
  USER ,
}

type User = {
  id: number
  username: string
  email: string
  role: ROLE
  createdAt: Date
  updatedAt: Date
}
