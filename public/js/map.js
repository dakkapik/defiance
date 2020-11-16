function initMap() {
    const coralSprings = { lat: 26.272159, lng: -80.261892 };
    
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: coralSprings,
    });
    socket.on('new-driver', driver=>{
        const marker = addDriverMarker(coralSprings, map, driver)

        socket.on('driver-location', location=>{
            marker.setPosition(new google.maps.LatLng(location.coords.latitude, location.coords.longitude))
        })

        socket.on('driver-disconnected', (driver)=>{
            //remove this driver
        })
    })
}

function addDriverMarker(location, map, driver){
    const marker = new google.maps.Marker({
        position: location,
        label: driver.toString(),
        map: map
    })
    return marker
}