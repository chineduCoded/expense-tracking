const { Categories } = require("../models/models")


// post:http://localhost:8080/api/categories
const createCategories = async (req, res) => {
    const Create = Categories({
        type: "Investment",
        color: "#FCBE44" 
    })

    try {
        await Create.save()
        res.status(201).json(Create)
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

// get:http://localhost:8080/api/categories
const getCategories = async (req, res) => {
    try {
        const data = await Categories.find({})

        const filter= await data.map(v=> Object.assign({}, {type: v.type, color: v.color}))
        return res.json(filter)
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}




module.exports = {
    createCategories,
    getCategories,
}