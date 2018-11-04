const axios = require('axios');

var oldTemperature = 0

setInterval(() => {
    const newTempperature = temperature(0,10)
    if(newTempperature !== oldTemperature )
    //axios.post('https://test-api-221311.appspot.com/sensor', {
    axios.post('http://localhost:8080/sensor', {
        id: 'ewfsd8723jkk3mpm43',
        status: 'online',
        temp: newTempperature
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    oldTemperature = newTempperature   
}, 3000);

const temperature = (min, max) => Math.floor(Math.random()*(max-min)+min);
