$(document).ready(function() {
	//MAP
	if($('#page-map').length){
		ymaps.ready(initOffices);

	}

});

// Карта списка аптек
function initOffices() {

	destinations = {
        'Минск': [53.9045398,27.5615244],
        'Брест': [52.0976214, 23.7340503],
        'Витебск': [55.1848061, 30.201622],
        'Гродно': [53.6693538, 23.8131306],
        'Гомель': [52.4411761, 30.9878461]
    };

	// Создание экземпляра карты.
	var myMap = new ymaps.Map('page-map', {
			center: [53.9045398,27.5615244],
			zoom: 13,
			controls: []
	}); 
	for (var i = 0; i < cities.length; i++) {
		createSelectCities(cities[i]);
	}

	for (var j = 0; j < cities.length; j++) {
		createList(cities[j], cluster);
	}

	// if ($(window).width() <= 1023)
	// 	myMap.setCenter([53.9045398,27.5615244]);

	function createSelectCities () {
		// Кластер для геообъектов группы
		cluster = new ymaps.Clusterer({
			clusterDisableClickZoom: false,
			gridSize: 64,
			clusterIcons: [{
				href:'img/content/cluster.png',
				size:[70,70],
				offset:[-35, -65]
			}],
			clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
				'<div style="font-size: 30px; line-height: 70px; color: #FFFFFF; text-align: center">{{ properties.geoObjects.length }}</div>'),
		});
		// Добавляем кластер на карту.
		myMap.geoObjects.add(cluster);

	}

	// Создаем список
	function createList (item, cluster) {

		//Вид иконок для меток
		defaultOptions = {
			iconLayout: 'default#image',
			iconImageHref: item.iconWay,
			iconImageSize: [50,72],
    		iconImageOffset: [-25, -67],
    		id: item.id,
		},
		
		// Создаем метку
		placemark = new ymaps.Placemark(item.center, {
		}, defaultOptions);

		// Добавляем метку в кластер
		cluster.add(placemark);

	}

	// Запрещаем зум скроллом
	myMap.controls.add(new ymaps.control.ZoomControl({options: { position: { right: 10, top: 50 }}}));
    myMap.behaviors.disable('scrollZoom');

    //Показать все метки на карте
    //myMap.setBounds(myMap.geoObjects.getBounds());

	// Запрещаем перетаскивание карты на телефоне(перетаскивание остается двумя пальцами)
	// if ($(window).width() <= 767){
	// 	myMap.behaviors.disable('drag');
	// }


	$('#js-toggle-map').on('change', function(){
	  	var city = $(this).find(":selected").val();
	  	//console.log(city);

	  	myMap.panTo(destinations[city], {
            flying: false,
        });
	});
}

