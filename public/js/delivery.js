let token = "c11ce4e2dbb2171b9e5acf1f8bb8299f7abddfd7";
function join(arr /*, separator */) {
  var separator = arguments.length > 1 ? arguments[1] : ", ";
  return arr
    .filter(function (n) {
      return n;
    })
    .join(separator);
}
function showPostalCode(address) {
  $("#zip_code").val(address.postal_code);
}
function showRegion(address) {
  $("#region").val(
    join([
      join([address.region_type, address.region], " "),
      join([address.area_type, address.area], " "),
    ])
  );
}
function showCity(address) {
  $("#city").val(
    join([
      join([address.city_type, address.city], " "),
      join([address.settlement_type, address.settlement], " "),
    ])
  );
}
function showStreet(address) {
  $("#street").val(join([address.street_type, address.street], " "));
}
function showHouse(address) {
  $("#house").val(join([address.house_type, address.house], " "));
}
function showBlock(address) {
  $("#block").val(join([address.block_type, address.block], " "));
}
function showFlat(address) {
  $("#flat").val(join([address.flat_type, address.flat], " "));
}
function showSelected(suggestion) {
  var address = suggestion.data;
  showPostalCode(address);
  showRegion(address);
  showCity(address);
  showStreet(address);
  showHouse(address);
  showBlock(address);
  showFlat(address);
}
$("#address").suggestions({
  token: token,
  type: "ADDRESS",
  onSelect: showSelected,
});

$("form[name=short_delivery_form]").on("submit", function (event) {
  let address_feedback = $("#address-feedback");
  let address = $("#address");
  address_feedback.html("");
  address.removeClass("is-invalid");
  if (
    !$("#region").val() ||
    !$("#city").val() ||
    !$("#street").val() ||
    !$("#house").val() ||
    !$("#postal_code").val()
  ) {
    event.preventDefault();
    address.addClass("is-invalid");
    address_feedback.html(
      "Неверно заполнен адрес (необходимо указать адрес с точностью до номера дома/квартиры)"
    );
  }
});

//   -----

var geocoder;
var map;
let infoWindow;
document.getElementById("zip_code").value = "no";
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: "roadmap",
    mapTypeControl: false,
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  geocoder.geocode({ address: "أَبو ظَبِي‎ " }, function (results, status) {
    if (status == "OK") {
      map.setCenter(results[0].geometry.location);
      marker = new google.maps.Marker({
        draggable: true,
        map: map,
        // position: results[0].geometry.location
      });
      google.maps.event.addListener(marker, "drag", (event) => {
        geocodeLatLng(geocoder, map);
      });
      google.maps.event.addListener(map, "click", (event) => {
        marker.setPosition(event.latLng);
        geocodeLatLng(geocoder, map);
      });
    }
  });
  infoWindow = new google.maps.InfoWindow();
  var currentProtocol =
    document.location.protocol == "https:" ? "https" : "http";

  if (currentProtocol != "http") {
    const locationButton = document.createElement("button");

    locationButton.setAttribute("class", "btn btn-info");
    locationButton.setAttribute("style", "width: 40px; margin-right: 10px");
    locationButton.textContent = "My";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(locationButton);
    locationButton.addEventListener("click", (event) => {
      event.preventDefault();
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            marker.setPosition(pos);
            geocodeLatLng(geocoder, map);
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

  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      marker.setPosition(place.geometry.location);
      geocodeLatLng(geocoder, map);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
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

function codeAddress() {
  var address =
    document.getElementById("first_line").value +
    " " +
    document.getElementById("second_line").value;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
    }
  });
}

function geocodeLatLng(geocoder, map, infowindow) {
  const latlng = {
    lat: marker.getPosition().lat(),
    lng: marker.getPosition().lng(),
  };

  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        addressComponentArray = response.results[0].address_components;
        str = "";
        // не понятно почему, но response.results[0] исчезает после нижнего foreach!!!
        google_jhan = response.results[0].formatted_address;
        document.getElementById("google_address").value = google_jhan;

        addressComponentArray.forEach((element) => {
          typeArray = element.types;
          // let isElementForAddressLine = true;
          typeArray.forEach((type) => {
            if (type == "locality") {
              document.getElementById("city").value = element.long_name.replace(
                /[^a-z\s]/gi,
                ""
              );
              // isElementForAddressLine = false;
            } else if (type == "country") {
              arr = $("select[name=delivery_country_id] option");
              for (i = 0; i < 194; i++) {
                countryName = element.long_name;
                if (countryName == "United States") {
                  countryName = "United States of America";
                }
                if (arr[i].innerText == countryName) {
                  document.getElementById("delivery_country_id").value =
                    arr[i].value;
                  if (arr[i].value == 3263) {
                    document.getElementById("zip_code").value = "no";
                  }
                }
              }
              // isElementForAddressLine = false;
            } else if (type == "administrative_area_level_1") {
              document.getElementById("region").value =
                element.long_name.replace(/[^a-z\s]/gi, "");
              // isElementForAddressLine = false;
            } else if (type == "administrative_area_level_2") {
              // isElementForAddressLine = false;
            } else if (type == "postal_code") {
              document.getElementById("zip_code").value = element.long_name;
            }
          });
          // if (isElementForAddressLine) {
          //      str += element.long_name + ' ';
          // }
        });

        // str = str.replace(/[^a-z0-9#+/\\\-\s]/gi, '');
        // document.getElementById('first_line').value = str;
      }
    })
    .catch((e) => console.log("nice trying"));
}

$("#first_line").change(function () {
  codeAddress();
});
$("#second_line").change(function () {
  codeAddress();
});
$("#button-map").click(function () {
  if ($("#map-container").attr("hidden")) {
    $("#map-container").removeAttr("hidden");
    document.getElementById("button-text").innerText =
      document.getElementById("hide_map").innerText;
  } else {
    document.getElementById("map-container").setAttribute("hidden", "true");
    document.getElementById("button-text").innerText =
      document.getElementById("show_map").innerText;
  }
});
