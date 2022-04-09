const router = require("express").Router()
const getLabels  = require("../controller/labelController")

router.route("/")
    .get(getLabels)

module.exports = router