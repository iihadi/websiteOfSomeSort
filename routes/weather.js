const express = require('express')
let apiKey = 'appid=736cc3badd9309cd9e4b664afb1656e5'
let url = 'http://api.openweathermap.org/data/2.5/weather?q='
let units = ' units=metric'
var request = require('request')
const router = express.Router()

// `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

// Weather page, renders a blank
router.get('/', (req, res) => {
  res.render('weather', { body: '', forecast: '' })
})

// Weather page after a weather request has been made
router.post('/', function (req, res, next) {
  let city = req.body.city

  url = url + city + '&' + units + '&' + apiKey

  request(url, function (error, response, body) {
    console.log('error: ', error) // Print the error if one has occured
    console.log('statusCode: ', response && response.statusCode)
    body = JSON.parse(body)
    console.log(body)
    if (error && response.statusCode !== 200) {
      throw error
    }

    let country = (body.sys.country) ? body.sys.country : ''
    let forecast = 'For city: ' + city + ', country: ' + country

    res.render('weather', { body: body, forecast: forecast })
  })
})

module.exports = router
