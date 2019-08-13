console.log('Client side javascript file is loaded');


const getWeather = (address, callback) => {
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {

            if(data.error)
                return callback(`Error: ${data.error}`);

            callback(undefined, data);
        })
        
    })

}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationPar = document.querySelector('#location');
const forecastPar = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (e) => {
  
    e.preventDefault();
    const location = search.value;

    locationPar.textContent = 'Loading...';
    forecastPar.textContent = '';

    getWeather(location, (error, data) => {
        if(error) {

            locationPar.textContent = error;
            return forecastPar.textContent = '';
        }

        locationPar.textContent = data.location;
        forecastPar.textContent = data.forecast;
    })

})
