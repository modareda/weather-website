const request = require('request')

// const mapBoxurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWFobW91ZHJlZGEiLCJhIjoiY2s1czZ3ZnBkMGozazNwcDI2d25wd2xrNiJ9.Y9LdLrU6r8C5hCRc6pkPjg&limit=1';
// request({url: mapBoxurl, json: true}, (err, res) => {
//     if(err) {
//         console.log('Unable to connect to geocoding service');
//     } else if(res.body.message) {
//         console.log('Your location does not exist')
//     } else {
//         const features = res.body.features[0];
//         const Long = features.center[0];
//         const Lat = features.center[1];
//     }
// });

const geocode = (address, callback) => {
    const mapBoxurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFobW91ZHJlZGEiLCJhIjoiY2s1czZ3ZnBkMGozazNwcDI2d25wd2xrNiJ9.Y9LdLrU6r8C5hCRc6pkPjg&limit=1`;

    request({url: mapBoxurl, json: true}, (err, res) => {
        if(err){
            callback('Unable to connect to geocoding service', undefined);
        } else if(res.body.message || res.body.features.length == 0){
            callback('Your location does not exist', undefined);
        } else {
            const data= {
                place: res.body.features[0].place_name,
                long: res.body.features[0].center[0],
                lat: res.body.features[0].center[1],
            }

            callback(undefined, data);
        }
    })
}

module.exports = geocode;