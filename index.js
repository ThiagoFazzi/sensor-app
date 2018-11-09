const axios = require('axios');

const createSensor = (macAddres, type, interval, min, max) => {

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
          type: type,
          status: 'initialized',
          created: new Date()
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
        .catch((error) => console.log(error.message))
      } else {
        const newTempperature = temperature(min,max).toString()
        if(newTempperature !== oldTemperature )
        //axios.post('https://test-api-221311.appspot.com/sensor', {
        axios.patch(`http://localhost:8080/sensor/${sensor.id}`, {
          status: 'online',
          value: newTempperature,
          date: new Date()
        })
        .then(response => console.log(sensor.id, response.data.value))
        .catch(error => console.log(error.message))
        
        oldTemperature = newTempperature
      }
  }, interval);
}

//const temperature = (max) => Math.floor(Math.random()*max);
const temperature = (min,max) => Math.floor(Math.random()*(max-min)+min);

//Promise.resolve(createSensor('00-00-00-00-00-FF', 'Temperature',2000,10, 100))
createSensor('00-00-00-00-00-FF', 'Temperature',2000,10, 100)
//Promise.resolve(createSensor('00-00-00-00-FF-FF', 'Umit' ,3000, 90, 100))
createSensor('00-00-00-00-FF-FF', 'Umit' ,3000, 90, 100)
