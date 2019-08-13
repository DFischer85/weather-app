const request = require('request');

const geocode = (address, callback) => {
    
    if(typeof(address) !== 'string')
        return console.log('Please provide a real location');

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGZpc2NoZXI4NSIsImEiOiJjanoyaXRuYTgwMHh3M3BsMTByMWtoZHU4In0.sUzh95F_PwTCsc6zp7exUA&limit=1`;
    request({ url , json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to geolocation service');
        }
        else {
            if(body.features.length === 0)
                callback('Unable to find location');
            else {
                
                const geocode = {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                }

                callback(undefined, geocode);
            }
        }
    });
}

module.exports = geocode