import { Router } from "express"
import { signin, signup } from "../controllers/usuarios.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { usuarioSchema } from "../schemas/usuarios.schema.js"

const usuariosRouter = Router()

usuariosRouter.post("/sign-up", validateSchema(usuarioSchema), signup)
usuariosRouter.post("/sign-in", signin)

export default usuariosRouter