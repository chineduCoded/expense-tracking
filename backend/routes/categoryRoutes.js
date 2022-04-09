const express = require("express")
const router = express.Router()
const { createCategories, getCategories, createTransaction, getTransaction } = require("../controller/categoryController")

router.route("/")
    .post(createCategories)
    .get(getCategories)


module.exports = router