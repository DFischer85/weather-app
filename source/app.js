const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');


const app = express();

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Daniel'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Are you looking for help?',
        name: 'Daniel Fischer'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    
    if(!address)
        return res.send ({error: 'Please provide an address'});

    geocode(address, (error, { latitude, longitude, location } = {})=> {
            if(!error) {
                forecast(longitude, latitude, (error, { temperature, precipProbability }) => {
                    if(error)
                         res.send({ error: error});
                    else {
                        res.send({ 
                            location, 
                            forecast: `It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`,
                            address
                        })
                    }             
                  })
              }   
         else
                res.send({ error: error});
    });
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please provide search term'
        });
    }

    console.log(req.query.search)
    res.send({
         products: []
    })
    

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Could not find any help articles',
        name: 'Daniel Fischer'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!',
        name: 'Daniel Fischer'
    })
})

app.listen(3000, ()=> {
    console.log('Server started');
});