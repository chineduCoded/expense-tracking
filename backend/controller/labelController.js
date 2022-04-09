const { Transaction } = require("../models/models")

const getLabels = async (req, res) => {
   await Transaction.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "categoriesInfo"
            }
        },
        {
            $unwind: "$categoriesInfo"
        }
    ]).then(result => {
        const data = result.map(v => Object.assign({}, 
            {_id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categoriesInfo.color}))
        res.json(data)
    }).catch(error => {
        res.status(400).json("Lookup collection Error")
    })
}

module.exports = getLabels