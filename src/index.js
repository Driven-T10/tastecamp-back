import express from "express"
import cors from "cors"

const app = express() // app do servidor
app.use(cors())

app.get("/receitas", (req, res) => {
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

    res.send(receitas)
})

const PORT = 4000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)) // 3000 e 5999