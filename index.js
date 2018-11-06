const axios = require('axios');

const createSensor = (macAddres, type, min, max) => {

  var oldTemperature = 0

  var sensor = {
    id: null,
    status: 'offline',
    type: type,
    created: null
  }

  setInterval(() => {
      if(sensor.id === null){
        axios.post('http://localhost:8080/sensor/new', {
          macAddres: macAddres,
          type: type
        })
        .then((response)=> {
          console.log(response.data.sensor)
          sensor = {
            id: response.data.sensor.id,
            status: response.data.sensor.status,
            type: response.data.sensor.type,
            created: response.data.sensor.created
          }
        })
        .catch((error) => console.log(error))
      } else {

        const newTempperature = temperature(min,max)
        if(newTempperature !== oldTemperature )
        //axios.post('https://test-api-221311.appspot.com/sensor', {
        axios.post('http://localhost:8080/sensor', {
          id: sensor.id,
          status: sensor.status,
          value: newTempperature,
          type: type
        })
        .then(response => console.log(macAddres, response.data))
        .catch(error => console.log(error))
        
        oldTemperature = newTempperature
      }
  }, 1000);
}

const temperature = (min, max) => Math.floor(Math.random()*(max-min)+min);

createSensor('00-00-00-00-00-FF', 'Temperature', 0, 10)
createSensor('00-00-00-00-FF-FF', 'Umit',0,100)
