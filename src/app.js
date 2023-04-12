import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from "mongodb"
import dotenv from "dotenv"

// Criação do App Servidor
const app = express()

// Configurações
app.use(cors())
app.use(express.json())
dotenv.config()

// Conexão com o banco de dados
let db
const mongoClient = new MongoClient(process.env.DATABASE_URL)
mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((err) => console.log(err.message))

// Endpoints
app.get("/receitas", (req, res) => {
    db.collection("receitas").find().toArray()
        .then(receitas => res.send(receitas))
        .catch(err => res.status(500).send(err.message))
})

app.get("/receitas/:id", (req, res) => {
    const { id } = req.params

    db.collection("receitas").findOne({ _id: new ObjectId(id) })
        .then((receita) => {
            if (!receita) return res.status(404).send("Receita não existe")
            res.send(receita)
        })
        .catch((err) => res.status(500).send(err.message))
})

app.post("/receitas", (req, res) => {
    const { titulo, ingredientes, preparo } = req.body

    if (!titulo || !ingredientes || !preparo) {
        return res.status(422).send("Todos os campos são obrigatórios")
    }

    const novaReceita = { titulo, ingredientes, preparo }
    db.collection("receitas").insertOne(novaReceita)
        .then(() => res.sendStatus(201))
        .catch(err => res.status(500).send(err.message))
})

// Deixa o app escutando, à espera de requisições
const PORT = 4000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)) // 3000 e 5999