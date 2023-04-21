import { Router } from "express"
import receitasRouter from "./receitas.routes.js"
import usuariosRouter from "./usuarios.routes.js"

const router = Router()
router.use(usuariosRouter)
router.use(receitasRouter)

export default router