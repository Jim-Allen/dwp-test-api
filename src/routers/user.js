const express = require('express')
const axios = require('axios')
const router = new express.Router()
const milesFromOrigin = require('../utils/geolocation')

//Get users living within 50 mile radius of London Charing Cross 
//from where road distances from London are traditionally calculated.
router.get('/London/Users', (req, res) => {

    const latOrigin = 51.507304     //London Charing Cross latitude in decimal degrees
    const lonOrigin = -0.127659     //London Charing Cross longitude in decimal degrees
    const radius = 50               //radius in statute miles
    const url = 'https://bpdts-test-app.herokuapp.com/users'    //API to get users and their latitude, longitude

    let users = []
    axios.get(url).then(response => {
        users = response.data.filter(function(user)
        //Filter the response data to return only users within 50 miles of London Charing Cross
        {
            return milesFromOrigin(latOrigin, lonOrigin, user.latitude, user.longitude) <= radius 
        })
        res.status(200).send(users)
    })
    .catch(error => {
        if (error.response) {
            res.status(error.response.status).send(error)
        } else if (error.request) {
            res.status(error.request.status).send(error)
        } else {
            res.status(400).send(error)
        }
    })
})

module.exports = router