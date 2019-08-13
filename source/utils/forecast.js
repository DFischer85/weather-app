const request = require('request');

const getForecast = (longitude, latitude, callback) => {

    const url = `https://api.darksky.net/forecast/2ca32436928ea4ba61cf127a14d01dd6/${latitude},${longitude}`;

    request({ url , json: true }, (error, { body }) => {
        if(error)
            callback('Unable to connect to weather service');
        else {
            if (body.error)
                callback('Unable to find location');
            else 
                callback(undefined, body.currently);
        }
    });
}

module.exports = getForecast;