import { Router } from "express"
import { createReceita, deleteMuitasReceitas, deleteReceita, editMuitasReceitas, editReceitaById, getReceitaById, getReceitas } from "../controllers/receitas.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { receitaSchema } from "../schemas/receitas.schema.js"
import { authValidation } from "../middlewares/auth.middleware.js"

const receitasRouter = Router()

receitasRouter.use(authValidation)

receitasRouter.get("/receitas", getReceitas)
receitasRouter.get("/receitas/:id", getReceitaById)
receitasRouter.post("/receitas", validateSchema(receitaSchema), createReceita)
receitasRouter.delete("/receitas/:id", deleteReceita)
receitasRouter.delete("/receitas/muitas/:filtroIngredientes", deleteMuitasReceitas)
receitasRouter.put("/receitas/:id", validateSchema(receitaSchema), editReceitaById)
receitasRouter.put("/receitas/muitas/:filtroIngredientes", validateSchema(receitaSchema), editMuitasReceitas)

export default receitasRouter