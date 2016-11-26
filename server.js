var EventSource = require('eventsource');
var rest = require('restler');

// Photon ID information
var deviceID = "190033000347343337373737";
var accessToken = "716bac941dd4f62b57b5feda804617be40c857c6";
var accessTokenURI = "/?access_token=" + accessToken;
var device = "https://api.particle.io/v1/devices/" + deviceID;
var eventsURI = device + "/events" + accessTokenURI;
var eventSrc = new EventSource(eventsURI);
var night = "This is where the logged data will go!";
var gLedURI = device + "/gLed" + accessTokenURI;
var yLedURI = device + "/yLed" + accessTokenURI;

// Listen for Microphone Data
eventSrc.addEventListener('Microphone', function(e) {
	console.log("Microphone");
    var data = JSON.parse(e.data);
    var noise = JSON.parse(data['data']);
    io.sockets.emit("Microphone", noise);
});

// Listen for Photoresistor
eventSrc.addEventListener('Photoresistor', function (e) {
	console.log("Photoresistor");
    var data = JSON.parse(e.data);
    var light = JSON.parse(data['data']);
    io.sockets.emit("Photoresistor", light);
});

// Listen for Motion Sensor
eventSrc.addEventListener('Motion', function (e) {
	console.log("Motion");
	var data = JSON.parse(e.data);
	var motion = JSON.parse(data['data']);
	io.sockets.emit("Motion", motion);
});

// Listen for Status (indicates connection)
eventSrc.addEventListener('status', function (e) {
	console.log("status");
    var data = JSON.parse(e.data);
    console.log(data);
});


// Actuation from website to Photon
var yellowLED = device + "/digitalWrite -d arg\=\"D1,HIGH\"" + accessTokenURI;
var green2 = device + "/digitalWrite -d arg\=\"D0,HIGH\"" + accessTokenURI;

function yellow() {
	rest.post(yellowLED).on('complete', function (data, response) {
		console.log(data);
	});
}

function grn2() {
	rest.post(green2).on('complete', function (data, response) {
		console.log(data);
	});
}



var express = require('express');
var app = express();

// New Page to display logged information
app.get('/prev_night', function(req, res){
    console.log("prev_night");
    res.json();
});

var sensorReading="not yet available";

//============================================================== 
//==============================================================
//============================================================== 
// Set Up HTTP Server
app.set('views', __dirname + '/views');

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/assets'));
//app.get('/', function(req, res){
app.get('http://cortensinger.github.io', function(req, res){
  //render the index.jade template
  //don't provide variables - we'll use socket.io for that
  res.render('index');
});


var server = app.listen(3000, function() {
	console.log("hi");	
});
var io = require('socket.io').listen(server);
//============================================================== 
//============================================================== 
//============================================================== 

function sendData(type) {
	console.log("received value: "+data);
};

// when data arrives via the socket as a "toggle" message, relay to serial port
io.sockets.on('connection', function (socket) {
  socket.on('button', function (data) {
    console.log("button: "+data);
	rest.post(yLedURI).on('complete', function (data, response) {
		console.log(data);
	});
  });

  socket.on('button2', function (data) {
	console.log("button2: "+data);
	rest.post(gLedURI).on('complete', function (data, response) {
		console.log(data);
	});
  });

});
