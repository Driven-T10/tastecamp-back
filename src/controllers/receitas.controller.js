import { db } from "../database/database.connection.js"
import { ObjectId } from "mongodb"

export async function getReceitas(req, res) {
    try {
        const receitas = await db.collection("receitas").find().toArray()
        res.send(receitas)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getReceitaById(req, res) {
    const { id } = req.params

    try {
        const receita = await db.collection("receitas").findOne({ _id: new ObjectId(id) })
        if (!receita) return res.status(404).send("Receita não existe")
        res.send(receita)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createReceita(req, res) {
    const { titulo } = req.body

    try {
        const recipe = await db.collection("receitas").findOne({ titulo })
        if (recipe) return res.status(409).send("Essa receita já existe!")

        const sessao = res.locals.sessao

        await db.collection("receitas").insertOne({ ...req.body, idUsuario: sessao.idUsuario })
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteReceita(req, res) {
    const { id } = req.params

    try {
        const result = await db.collection("receitas").deleteOne({ _id: new ObjectId(id) })

        if (result.deletedCount === 0) return res.status(404).send("Esse item não existe!")
        res.send("Item deletado com sucesso!")

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteMuitasReceitas(req, res) {
    const { filtroIngredientes } = req.params

    try {
        const result = await db.collection("receitas").deleteMany({ ingredientes: filtroIngredientes })
        if (result.deletedCount === 0) return res.status(404).send("Não ha receitas com esse critério")
        res.send("Ites deletados com sucesso")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function editReceitaById(req, res) {
    const { id } = req.params

    try {
        // Procurar receita que vai ser editada
        const receita = await db.collection("receitas").findOne({ _id: new ObjectId(id) })
        if (!receita) return res.sendStatus(404)

        const sessao = res.locals.sessao

        // Se o criador da receita não for a pessoa que tentou editar, dá um erro
        if (!receita.idUsuario.equals(sessao.idUsuario)) return res.sendStatus(401)

        await db.collection("sessions").updateOne(
            { _id: new ObjectId(id) },
            { $set: req.body }
        )
        res.send("Receita atualizada!")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function editMuitasReceitas(req, res) {
    const { filtroIngredientes } = req.params

    try {
        const result = await db.collection("receitas").updateMany(
            { ingredientes: { $regex: filtroIngredientes, $options: "i" } },
            { $set: req.body }
        )

        if (result.matchedCount === 0) return res.status(404).send("Não há nenhuma receita com esse filtro!")
        res.send("Receitas editadas!")

    } catch (err) {
        res.status(500).send(err.message)
    }
}