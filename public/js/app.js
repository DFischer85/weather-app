const getWeather = (address, callback) => {
    fetch(`/weather?address=${address}`).then((response) => {
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
const summaryPar = document.querySelector('#summary');

weatherForm.addEventListener('submit', (e) => {
  
    e.preventDefault();
    const location = search.value;

    locationPar.textContent = 'Loading...';
    forecastPar.textContent = '';
    summaryPar.textContent = '';

    getWeather(location, (error, data) => {
        if(error) {

            locationPar.textContent = error;
            summaryPar.textContent = '';
            return forecastPar.textContent = '';
        }

        locationPar.textContent = data.location;
        summaryPar.textContent = data.summary;
        forecastPar.textContent = data.forecast;
    })

})
