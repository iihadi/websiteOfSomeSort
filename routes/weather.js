const express = require('express')
// const request = require('request')

const router = express.Router()

// About page
router.get('/', (req, res) => {
  res.render('weather')
})

module.exports = router
