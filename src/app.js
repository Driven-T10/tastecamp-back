import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import joi from "joi"
import { createReceita, deleteMuitasReceitas, deleteReceita, editMuitasReceitas, editReceitaById, getReceitaById, getReceitas } from "./controllers/receitasController.js"
import { signin, signup } from "./controllers/usuarioController.js"

// Criação do App Servidor
const app = express()

// Configurações
app.use(cors())
app.use(express.json())
dotenv.config()

// Conexão com o banco de dados
const mongoClient = new MongoClient(process.env.DATABASE_URL)
try {
    await mongoClient.connect()
    console.log("MongoDB conectado!")
} catch (err) {
    console.log(err.message)
}
export const db = mongoClient.db()

// Schemas
export const usuarioSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required().min(3)
})

export const receitaSchema = joi.object({
    titulo: joi.string().required(),
    ingredientes: joi.string().required(),
    preparo: joi.string().required()
})

// Rotas
app.get("/receitas", getReceitas)

app.get("/receitas/:id", getReceitaById)

app.post("/receitas", createReceita)

app.delete("/receitas/:id", deleteReceita)

app.delete("/receitas/muitas/:filtroIngredientes", deleteMuitasReceitas)

app.put("/receitas/:id", editReceitaById)

app.put("/receitas/muitas/:filtroIngredientes", editMuitasReceitas)

app.post("/sign-up", signup)

app.post("/sign-in", signin)


// Deixa o app escutando, à espera de requisições
const PORT = 4000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)) // 3000 e 5999