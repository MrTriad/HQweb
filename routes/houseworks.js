const express = require('express')
const router = express.Router()

router.get('/',  async (req, res) => {
    res.render('houseworks/index')
})

module.exports = router