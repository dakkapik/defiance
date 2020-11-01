function initMap() {
    const directionsService = new google.maps.DirectionsService();

    document.getElementById("submit-button").addEventListener("click", function () {
        queryRoutes(directionsService);
    });
}

function queryRoutes(directionsService) {

    directionsService.route(
        {
            origin: "26.260497514691856, -80.26398090860468",
            destination: document.getElementById("direction-input").value,
            travelMode: "DRIVING",
        },
        function (response, status) {
            if (status === "OK") {
                console.log(response)
                let route = response.routes[0];
                let summaryPanel = document.getElementById("query-results");
                summaryPanel.innerHTML = summaryPanel.innerHTML += route.legs[0].distance.value;

            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}
