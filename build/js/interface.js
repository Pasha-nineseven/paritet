$(document).ready(function() {
	flexibility(document.documentElement);

	//TOP-MENU
    $("body").on("click", ".js-page-header-more__link", function(e){
        e.preventDefault();
        $('.page-header-more__list').fadeToggle(170);
    });
    $("body").on("click", ".js-page-header-more__close", function(e){
        e.preventDefault();
        $('.page-header-more__list').fadeOut(170);
    });
	
	//ACCORDEON
    $("body").on("click", ".accordeon__link", function(e){
        e.preventDefault();
        $(this).parents('.accordeon__item').toggleClass('active');
        $(this).next('.accordeon__info').slideToggle();
    });

	//POPUP-VIDEO
    $(".js-play-btn").fancybox({
        speed : 330,
        transitionEffect: "slide", 
        animationEffect: "zoom-in-out", 
        infobar: false,
         clickOutside : 'close',
        buttons: [
            "close"
        ],
    });


    //PAGE-SEARCH
    $("body").on("click", ".js-page-header-search__link", function(e){
        e.preventDefault();
        $('.page-header-search__toggle').fadeToggle(170);
        $(this).toggleClass('active');
    });
    $("body").on("click", ".js-page-header-search__close", function(e){
        e.preventDefault();
        $('.page-header-search__toggle').fadeOut(170);
        $(".js-page-header-search__link").removeClass('active');
    });



    //FOOTER-MENU-MOBILE
	var mql = window.matchMedia('all and (max-width: 600px)');
	if (mql.matches) {
	    $("body").on("click", ".js-page-footer-menu__title", function(e){
	        e.preventDefault();
	        $(this).toggleClass('active');
	        $(this).next('.page-footer-menu__list').slideToggle(150);
	    });
	} else {

	}


	//TOP SUBMENU
	$("body").on("click", ".js-top-area__toggle", function(e){
		e.preventDefault();
		$(this).parents('.top-area').find('.top-area__list').fadeToggle(200);
	});
	$(document).click(function (e){
		var div = $(".top-area");
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) {
			$('.top-area__list').fadeOut(100);
		}
	});


	//TOP-MENU-MOBILE
	var mqmob = window.matchMedia('all and (max-width: 768px)');
	if (mqmob.matches) {
	    $('body').on('click','.js-top__link--toggle', function(e){
			e.preventDefault();
			$(this).toggleClass('act');
			$('.top-menu-mobile').toggleClass('active');
			$('.menu-mobile__bg').fadeToggle();
			$('body').toggleClass('fixed');
		});

		$('body').on('click','.menu-mobile__bg', function(e){
			e.preventDefault();
			$('.js-top__link--toggle').removeClass('act');
			$('.top-menu-mobile').removeClass('active');
			$(this).fadeOut();
			$('body').removeClass('fixed');
			$('.second-level').removeClass('active');
		});
	}


	//MENU-MOBILE
	$('body').on('click','.js-menu-mobile-link', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.top-menu').toggleClass('active');
		$('.menu-mobile__bg-sec').fadeToggle();
		$('body').toggleClass('fixed');
	});
	$('body').on('click','.menu-mobile__bg-sec', function(e){
		e.preventDefault();
		$('.js-menu-mobile-link').removeClass('active');
		$('.top-menu').removeClass('active');
		$(this).fadeOut();
		$('body').removeClass('fixed');
		$('.second-level').removeClass('active');
	});


	//MENU-MOBILE-add
	$('body').on('click','.js-top-menu-add__more', function(e){
		e.preventDefault();
		$(this).next('.top-menu-more-list').slideToggle(150);
	});


	//SECOND-LEVEL
	$('body').on('click','.js-top-menu__link--submenu', function(e){
		e.preventDefault();
		$('.second-level').addClass('active');

        var label = $(this).data('label');
        $(".second-level__item").addClass('dnone');
        $("#"+label).removeClass('dnone');
	});

	$('body').on('click','.js-back-level', function(e){
		e.preventDefault();
		$('.second-level').removeClass('active');
	});
	$('body').on('click','.js-top-menu__close', function(e){
		e.preventDefault();
		$('.second-level').removeClass('active');
		$('body').removeClass('fixed');
		$('.js-menu-mobile-link').removeClass('active');
		$('.top-menu').removeClass('active');
		$('.menu-mobile__bg-sec').fadeOut();
	});

});




$(window).resize(function () {

});

// $(window).load(function(){

// });

// functions


// links pages
// $('body').append(
// 	'<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
// 		<a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px" onclick="$(this).parent().hide()">Close X</a> \
// 	<style> \
// 		#pages { padding: 10px 20px 0 50px; font-size: 18px; } \
// 		#pages a { text-decoration: none; } \
// 		#pages li { margin: 5px 0; } \
// 	</style> \
// 	<ol id="pages"> \
// 		<li><a href="about.html">About</a></li> \
// 		<li><a href="index.html">Index</a></li> \
// 	</ol> \
// </div>');
