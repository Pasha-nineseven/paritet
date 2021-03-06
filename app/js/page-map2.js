$(document).ready(function() {
	//MAP
	if($('#page-map2').length){
		ymaps.ready(initOffices2);

	}

});

// Карта списка аптек
function initOffices2() {

	destinations = {
        'Минск': [53.9045398,27.5615244],
        'Брест': [52.0976214, 23.7340503],
        'Витебск': [55.1848061, 30.201622],
        'Гродно': [53.6693538, 23.8131306],
        'Гомель': [52.4411761, 30.9878461]
    };

	// Создание экземпляра карты.
	var myMap2 = new ymaps.Map('page-map2', {
			center: [52.0976214, 23.7340503],
			zoom: 13,
			controls: []
	}); 
	// Контейнер для меню.
	//list = $('.salon-select__list');
	
	for (var i = 0; i < cities.length; i++) {
		createSelectCities(cities[i]);
	}

	for (var j = 0; j < cities.length; j++) {
		createList(cities[j], cluster);
	}

	// if ($(window).width() <= 1023)
	// 	myMap2.setCenter([53.9045398,27.5615244]);

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
		myMap2.geoObjects.add(cluster);

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
		placemark.events.add('mouseenter', function (e) {
			e.get('target').options.set(defaultOptions = {
				iconImageHref: item.iconWayH,
			});
	    });
	    placemark.events.add('mouseleave', function (e) {
			e.get('target').options.set(defaultOptions = {
				iconImageHref: item.iconWay,
			});
	    });

	}

	// Запрещаем зум скроллом
	myMap2.controls.add(new ymaps.control.ZoomControl({options: { position: { right: 10, top: 50 }}}));
    myMap2.behaviors.disable('scrollZoom');

    //Показать все метки на карте
    //myMap2.setBounds(myMap2.geoObjects.getBounds());

	// Запрещаем перетаскивание карты на телефоне(перетаскивание остается двумя пальцами)
	// if ($(window).width() <= 767){
	// 	myMap2.behaviors.disable('drag');
	// }


	$('#js-toggle-map2').on('change', function(){
	  	var city = $(this).find(":selected").val();
	  	//console.log(city);

	  	myMap2.panTo(destinations[city], {
            flying: false,
        });
	});
}

