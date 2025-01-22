import "@/configs/loadenv"
import { bootstrap } from "./app"

bootstrap().then((server) => {
  const port = process.env.PORT
  server.listen(port, () => console.log(`server is running on port ${port}`))
})
