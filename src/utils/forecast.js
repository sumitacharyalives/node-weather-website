const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/b9118b290c4ce5d865378b13925cf0a8/' + latitude + ',' + longitude + '?lang=en&units=si'

    // console.log(url)

    request({ url /*shortand for url:url */, json: true }, (error, {body}/**response.body */) => {

        if (error) {
            // console.log('unable to connect to server')
            callback('unable to connect to server',undefined)
        }
        else if (body.error) {
            // console.log('unable to find location')
            callback('unable to find location',undefined)
        }
        else {
            console.log(body)
            const data = (body)
            
            
            callback(undefined,data)

        
        }

    })
}

module.exports = forecast