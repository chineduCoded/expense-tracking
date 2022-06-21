const { Transaction } = require("../models/models")

// POST:http://localhost:8080/api/transaction
const createTransaction = async (req, res) => {
    if(!req.body) return res.status(400).json("Post HTTP data not provided")
    const { name, type, amount } = req.body

    const newTransaction =  Transaction({
        name,
        type,
        amount,
        date: new Date()
    })
    try {
        await newTransaction.save()
        res.status(201).json(newTransaction)
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

// GET:http://localhost:8080/api/transaction
const getTransaction = async (req, res) => {
    try {
        const data = await Transaction.find({})
        return res.json(data)
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

// DELETE:http://localhost:8080/api/transaction
const deleteTransaction = async (req, res) => {
    if (!req.body) return res.status(400).json({ message: "Requst body not Found"})
    await Transaction.deleteOne(req.body, function(err){
        if(!err) res.json("Record Deleted..!")
    }).clone().catch (function(err){
        res.json("Error while deleting Transaction Record")
    })
}


module.exports = {
    createTransaction,
    getTransaction,
    deleteTransaction
}