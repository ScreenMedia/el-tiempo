$(appStart);

function appStart() {
	var $tiempo = $(".tiempo").find('ul'),
		nombreDia = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
		html = '',
		forecast = {
			"apiKey": "440509c60f8d557edfa1f6721d1df8c2",
			"url": "https://api.forecast.io/forecast/",
			"lati": -34.91793,
			"longi": -56.16156,
			"lang": "es",
			"units": "si"
		};

	$.ajax({
		url: forecast.url + forecast.apiKey + "/" + forecast.lati + "," + forecast.longi + "?lang="+ forecast.lang +"&units="+ forecast.units +"&callback=?",
		dataType: "json",
		success: function(data) {
			for (var i = 0; i < 3; i++) {
				html += tiempoDia((i === 0 ? data.currently : data.daily.data[i]), i, nombreDia);
			}
			$tiempo.html(html);
		}
	});
}

function tiempoDia(data, pos, nombreDia) {
	var diaPos = new Date(data.time*1000),
		dia = (pos === 0 ? 'Hoy' : nombreDia[diaPos.getDay()]);
		temperatura = Math.round(pos === 0 ? data.temperature : data.temperatureMax),
		icono = iconoAnimado(data.icon);

	return '<li'+ (pos === 0 ? ' class="tiempo-hoy"' : '') +'><div class="dia">'+ dia +'</div>'+ icono +'<div class="temperatura">'+ temperatura +'&deg;C</div></li>';
}

function iconoAnimado(icono) {
	// Estados de la API:
	// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
	// Estados CSS
	// sun-shower, thunder-storm, cloudy, flurries, sunny, rainy

	// sun-shower
	if (icono === 'sun-shower')
		return	'<div class="icono sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>';

	// thunder-storm
	else if (icono === 'thunderstorm')
		return	'<div class="icono thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';

	// cloudy
	else if (icono === 'fog' || icono === 'cloudy' || icono === 'partly-cloudy-day' || icono === 'partly-cloudy-night')
		return	'<div class="icono cloudy"><div class="cloud"></div><div class="cloud"></div></div>';

	// flurries
	else if (icono === 'snow')
		return	'<div class="icono flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';

	// sunny
	else if (icono === 'clear-day' || icono === 'clear-night' || icono === 'wind' || icono === 'fog')
		return	'<div class="icono sunny"><div class="sun"><div class="rays"></div></div></div>';

	// rainy
	else if (icono === 'rain')
		return	'<div class="icono rainy"><div class="cloud"></div><div class="rain"></div></div>';

}