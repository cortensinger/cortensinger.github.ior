var socket = io.connect('http://localhost:3000');

// when a "sensorReading" message comes through, show its value by
// writing the text of the div with id=showValue

socket.on('Microphone', function (noise) {
	console.log(noise);
    $("#noise-val").text(noise);
	$("#light-val").text("[press button]");
});


socket.on('Photoresistor', function (light) {
	console.log(light);
    $("#light-val").text(light);
	$("#noise-val").text("[press button]");
	// something(light);
});

socket.on('Motion', function (motion) {
	console.log(motion);
	if (motion > 420) {
		$("#movement-val").text("MOTION!");
		$("#movement-val").css({
			"color": '#B22222'
		});
	} else {
		$("#movement-val").text("calm");
		$("#movement-val").css({
			"color": '#228B22'
		});
	}
});

//function something(light) {
//}



$( document ).ready( function () {
	$('#button').click( function () {
		console.log("button");
    	socket.emit('button','Toggle Yellow LED');
	});

	$('#button2').click( function () {
		console.log("button2");
		socket.emit('button2', 'Toggle Green LED');
	});
});

