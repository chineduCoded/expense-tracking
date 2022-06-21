const router = require("express").Router()
const { createTransaction, getTransaction, deleteTransaction } = require("../controller/transactionController")

router.route("/")
    .post(createTransaction)
    .get(getTransaction)
router.route("/:id")

module.exports = router