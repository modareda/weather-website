const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const darksky = require('./utils/darksky')

const app = express();
const port = process.env.PORT || 3000;

// Define Path for Express
const publicFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hbs engine
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicFolder))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You should provide an address'
        })
    }

    geocode(req.query.address, (err, geodata) => {
        if(err){
            return res.send({
                error: err
            });
        }

        
        darksky(geodata.lat, geodata.long, (err, data) => {
            if(err){
                return res.send({
                    error: err
                });
            }

            res.send({
                forecast: data,
                location: geodata.place,
                address: req.query.address
            })
        })
    })
})


app.get('*', (req, res) => {
    res.render('404')
})

/*
As we use (app.use()) 
this won't work
app.get('/', (req, res) => {
    res.send('Hello Express');
})

*/

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send({
//         help: 'no',
//         name: 'Mahmoud'
//     });
// })


app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})