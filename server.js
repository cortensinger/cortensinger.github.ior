var EventSource = require('eventsource');
var rest = require('restler');

var deviceID = "190033000347343337373737";
var accessToken = "03c45408f2650e0c9375564276adaa20fcb98c6a";
var accessTokenURI = "/?access_token=" + accessToken;
var device = "https://api.particle.io/v1/devices/" + deviceID;
var eventsURI = device + "/events" + accessTokenURI;
var eventSrc = new EventSource(eventsURI);
var pressureURI = device + "/fsrReading" + accessTokenURI;
var pressureDict = {};

var yellowLED = device + "/digitalWrite -d arg\=\"D1,HIGH\"" + accessToken;
var green1 = device + "/digitalWrite -d arg\=\"D2,HIGH\"" + accessToken;
var green2 = device + "/digitalWrite -d arg\=\"D0,HIGH\"" + accessToken;

eventSrc.addEventListener('Sensors', function(e) {
	console.log("Sensors");
    var data = JSON.parse(e.data);
    pressureDict = JSON.parse(data['data']);
    console.log(pressureDict);
//    console.log(JSON.stringify(pressureDict));
});

eventSrc.addEventListener('status', function (e) {
	console.log("status");
    var data = JSON.parse(e.data);
    console.log(data);
});

function yellow() {
	rest.post(yellowLED).on('complete', function (data, response) {
		var data = JSON.parse(e.data);
		console.log(data);
	});
}

function grn1() {
	rest.post(green1).on('complete', function (data, response) {
		var data = JSON.parse(e.data);
		console.log(data);
	});
}

function grn2() {
	rest.post(green2).on('complete', function (data, response) {
		var data = JSON.parse(e.data);
		console.log(data);
	});
}

var express = require('express');
var app = express();

app.get('/getPressure', function(req, res){
    console.log("getPressure");
    res.json(pressureDict);
});

app.listen(3000, function() {
	console.log("Yes");
});
