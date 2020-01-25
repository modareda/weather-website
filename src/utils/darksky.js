const request = require('request')

// const url = 'https://api.darksky.net/forecast/d21b428bf08789b5e4c22b6656a210c9/37.8267,-122.4233?units=si';

// request({url: url, json: true}, (err, res) => {
//     /*
//         This if json is false
//         // const data = JSON.parse(res.body);
//         // console.log(data.currently);
//     */
//    if(err){
//        console.log('Unable to connect to weather service');

//    } else if(res.body.error){
//         console.log(res.body.error)
//    } else {
//         const data = res.body.currently;
//         console.log(`It's ${data.temperature} degrees out. There is a ${data.precipProbability}% chance to rain`);
//    }
// });

const darksky = (long, lat, callback) => {
    const url = `https://api.darksky.net/forecast/d21b428bf08789b5e4c22b6656a210c9/${lat},${long}?units=si`;

    request({url: url, json: true}, (err, res) => {
        if(err){
            callback('Unable to connect to weather service', undefined);
    
        } else if(res.body.error){
            callback(res.body.error, undefined);
        } else {
            const data = res.body.currently;
            const feedback = `It's ${data.temperature} degrees out. There is a ${data.precipProbability}% chance to rain`;
            callback(undefined, feedback)
        }
    })

}
module.exports = darksky;