var id_vehiculo;
function onDocumentReady(){
	console.log("Se inicio el modulo de Grafica Mapa");
	 id_vehiculo = $('#id_vehiculo').val();
	console.log(id_vehiculo)
	var url = 'http://104.197.148.48/api/1.3/index.php/now/'+id_vehiculo;
	var lat =0 ;
	var long = 0;
	
	$.getJSON(url,function(result){
		console.log(result[0].GPS_LATITUD);
		console.log(result[0].GPS_LONGITUD);
		console.log(result[0].SPEED);
		lat = result[0].GPS_LATITUD;
		long = result[0].GPS_LONGITUD;
		//graficar
		var map = L.map('mimapa',{
		center:[lat,long],
		zoom :16	});
		var tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
		map.addLayer(tiles);	
		var marker = L.marker([lat ,long]).addTo(map);
		marker.bindPopup('<form action="" method="post" ><input type="date" name="fecha_inicio" placeholder="Fecha Inicio" class="form-control"><input type="date" name="fecha_fin" placeholder="Fecha Fin" class="form-control"><button type="submit" class="btn btn-default">Consultar</button></form>');

	});

	
}
$(document).on('ready',onDocumentReady);