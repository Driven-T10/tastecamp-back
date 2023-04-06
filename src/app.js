import express from "express"
import cors from "cors"

const app = express() // app do servidor
app.use(cors())

const receitas = [
    {
        id: 1,
        titulo: "Pão com Ovo",
        ingredientes: "Ovo e pão",
        preparo: "Frite o ovo e coloque no pão"
    },
    {
        id: 2,
        titulo: "Mingau de Whey",
        ingredientes: "Leite, Aveia e Whey",
        preparo: "Mistura tudo na panela fervendo",
    }
]

app.get("/receitas", (req, res) => {
    res.send(receitas)
})

app.get("/receitas/:id", (req, res) => {
    const { id } = req.params
    // const id = req.params.id

    const receita = receitas.find((item) => item.id === Number(id))
    res.send(receita)
})

const PORT = 4000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)) // 3000 e 5999