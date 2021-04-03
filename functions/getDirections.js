const axios = require("axios");

const gMapsEndpoint = "https://maps.googleapis.com/maps/api/directions/json?";

module.exports = function (origin, destination, waypoints) {
    return new Promise(( resolve, reject ) =>{
        const originString = `${origin.lat},${origin.lng}`
        const destinationString = `${destination.lat},${destination.lng}`
        let waypointString = ""
        waypoints.forEach(waypoint => {
            waypointString += (waypoint.lat + "," + waypoint.lng + "|")
        })
    
        const query = (gMapsEndpoint + `origin=${originString}&destination=${destinationString}&waypoints=${waypointString}&key=${process.env.google_maps_api}`)
    
        console.log(query)
    
        axios.get(query)
        .then(responce => {

            const { data } = responce;
            if(data.status === "OK") resolve(data);
            else reject(data);

        })
    })
}