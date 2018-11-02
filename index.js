const axios = require('axios');

setInterval(() => {
    console.log("passei")
    axios.post('https://test-api-221311.appspot.com/sensor', {
        id: 'ewfsd8723jkk3mpm43',
        status: 'online',
        temp: 10
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });   
}, 3000);
 
