// Escucho si el usuario se desconecta, y ejecuto algo
window.addEventListener("offline", (event) => {
  document.getElementById('offline').classList.remove('d-none');
  document.getElementById("main-container").classList.add('d-none');
});

// Escucho si el usuario tiene conexion
window.addEventListener("online", (event) => {
  document.getElementById("offline").classList.add("d-none");
  document.getElementById("main-container").classList.remove("d-none");
});

// MAPS

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.6158037, lng: -58.5033383 },
    zoom: 12,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.getElementById("custom-map-control-button");
  
  locationButton.addEventListener("click", (e) => {
    e.preventDefault();
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("You can adopt a dog here!");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}