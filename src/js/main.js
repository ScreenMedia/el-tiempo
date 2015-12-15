$(appStart);

function appStart() {
	var $tiempo = $("#tiempo").find('ul');

	$.simpleWeather({
		location: 'Montevideo, UY',
		woeid: '',
		unit: 'c',
		success: function(weather) {
			var html = '';

			for(var i = 0; i < 3; i++) {
				html += '<li'+ (i !== 0 ? '' : ' class="tiempo-hoy"') +'><span>'+ diaTranslate(weather.forecast[i].day, i) +'</span><i class="icon-'+ weather.forecast[i].code +'"></i> '+ weather.forecast[i].high +'&deg;C</li>';
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