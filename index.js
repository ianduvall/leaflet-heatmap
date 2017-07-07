let xTopLeft = 42.04062;
let yTopLeft = -87.88719;
let xDefault = 41.8781;
let yDefault = -87.6298;

let map = L.map('mapid').setView([xDefault, yDefault], 11.5);
L.tileLayer(
	'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
	{ attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 22,
	id: 'mapbox.streets',
	accessToken: ''// <--- insert MapBox access token here <---
}).addTo(map);

let markers = L.markerClusterGroup();

for (let i = 0; i < 300; ++i) {
	for (let j = 0; j < 300; ++j) {
		let popupMsg = '<b>' + (xTopLeft - i/1000) + ',' + (yTopLeft + j/1000) + '</b>';
		markers.addLayer(
			L.marker([xTopLeft - (i/1000), yTopLeft + (j/1000)]).bindPopup(popupMsg)
		);
	}
}

console.log('Displaying ' + 300 * 300 + ' markers');

map.addLayer(markers);


let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);