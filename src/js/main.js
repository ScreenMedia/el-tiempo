$(appStart);

function appStart() {
	var $tiempo = $("#tiempo");

	$.simpleWeather({
		location: 'Montevideo, UY',
		woeid: '',
		unit: 'c',
		success: function(weather) {
			html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
			html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
			html += '<li class="currently">'+weather.currently+'</li>';
			html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';

			$tiempo.html(html);
		},
		error: function(error) {
			$tiempo.html('<p>'+error+'</p>');
		}
	});
}