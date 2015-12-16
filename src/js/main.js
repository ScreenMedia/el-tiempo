$(appStart);

function appStart() {
	var $tiempo = $(".tiempo").find('ul');

	$.simpleWeather({
		location: 'Montevideo, UY',
		woeid: '',
		unit: 'c',
		success: function(weather) {
			var html = '';

			for(var i = 0; i < 3; i++) {
				html += '<li'+ (i !== 0 ? '' : ' class="tiempo-hoy"') +'><div class="dia">'+ diaTranslate(weather.forecast[i].day, i) +'</div><i class="icono-tiempo icon-'+ weather.forecast[i].code +'"></i><div class="temperatura">'+ weather.forecast[i].high +'&deg;C</div></li>';
				console.log(weather.forecast[i].day);
			}

			$tiempo.html(html);
		},
		error: function(error) {
			$tiempo.html('<p>'+error+'</p>');
		}
	});
}
function diaTranslate(dia, posicion) {
	dia = dia.toUpperCase();

	if (posicion !== 0) {
		if (dia === 'MON')
			return 'Lunes';
		else if (dia === 'TUE')
			return 'Martes';
		else if (dia === 'WED')
			return 'Miércoles';
		else if (dia === 'THU')
			return 'Jueves';
		else if (dia === 'FRI')
			return 'Viernes';
		else if (dia === 'SAT')
			return 'Sábado';
		else if (dia === 'SUN')
			return 'Domingo';
		else
			return '';
	} else
		return 'Hoy';
}