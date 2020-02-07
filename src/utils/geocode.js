const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VtaXRsaXZlcyIsImEiOiJjazV5MzFrMHUwNzdjM2pwM21xOXdzYnF2In0.PQRGNo_y9yZ_FRnVuGkhcw&limit=1'
    request({ url: url, json: true }, (error, {body}) => {

        if (error) {

            callback('unable to connect to server', undefined)
        }
        else if(body.features.length===0) {

            callback('unable to find location', undefined)
        }
        else {


            // latitude = body.features[0].center[1]
            // longitude = body.features[0].center[0]
            // locationName = body.features[0].place_name
            // console.log(locationName)

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                locationName:body.features[0].place_name
            })
        }

    })


}

module.exports = geocode