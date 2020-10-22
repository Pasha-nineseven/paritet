$(document).ready(function() {
	flexibility(document.documentElement);

	var btn = $('#button');

	$(window).scroll(function() {
	  if ($(window).scrollTop() > 300) {
	    btn.addClass('show');
	  } else {
	    btn.removeClass('show');
	  }
	});

	btn.on('click', function(e) {
	  e.preventDefault();
	  $('html, body').animate({scrollTop:0}, '200');
	});

	if ($("table").length>0) {
		$("table").wrap("<div class='table-wrap'></div>");
	}

	//SOCIALS
	$("body").on("click", ".js-page-socials__toggle", function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $('.page-socials__bg').fadeToggle();
        $('.page-socials__list').toggleClass('active');
    });
    $("body").on("click", ".page-socials__bg", function(e){
        e.preventDefault();
        $('.page-socials__toggle').removeClass('active');
        $('.page-socials__list').removeClass('active');
        $('.page-socials__bg').fadeOut();
    });


	//PRINT
    $('.js-page-print').click(function(){
        window.print();
    });

	//MAIN-SLIDER 
	if ($('.top-slider').length>0) {
        var time = 5;
        var $bar,
            $gallery,
            isPause,
            tick,
            percentTime;
        var $gallery = $('.top-slider');
        var $status = $('.pagingInfo i');
        var $statusCount = $('.pagingInfo span');

        $bar = $('.top-slider-line__fill');
        function startProgressbar() {
            resetProgressbar();
            percentTime = 0;
            isPause = false;
            tick = setInterval(interval, 25);
        }

        function interval() {
            if (isPause === false) {
                percentTime += 1 / (time + 0.1);
                $bar.css({
                    width: percentTime + "%"
                });
                if (percentTime >= 100) {
                    $gallery.slick('slickNext');
                    startProgressbar();
                }
            }
        }

        function resetProgressbar() {
            $bar.css({
                width: 0 + '%'
            });
            clearTimeout(tick);
        }

        startProgressbar();

        $gallery.on('init', function(event, slick, currentSlide){
            var slideCurrent = slick.currentSlide+1;
            $('#counter').addClass('activeSlide-' + slideCurrent);

            if (!($('.top-slider .slick-slide').length > 1)) {
                $('.main-prev').hide();
                $('.main-next').hide();
                $('.pagingInfo').hide();
            }
        });

        $gallery.on("afterChange", function(event, slick, currentSlide){
            var slideCurrent = slick.currentSlide+1;
            $('#counter').removeClass();
            $('#counter').addClass('activeSlide-' + slideCurrent);
            if (slick.$slides.length-1 == currentSlide) {
		    	$('#counter').addClass('last-slide');
		  	}
        });
        $gallery.on("beforeChange", function (){
            startProgressbar();
        });

        $gallery.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
	        var i = (currentSlide ? currentSlide : 0) + 1;
	        $status.text('0' + i);
	        $statusCount.text('/ ' + '0' + slick.slideCount);
	        $('.pagingInfo__current').text('0' + i);
	    });

        $gallery.slick({
            swipe: true,
            swipeToSlide: true,
            touchThreshold: 10,
            pauseOnFocus:false,
            pauseOnHover:false,
            pauseOnDotsHover:false,
            arrows:true,
            dots:false,
            useTransform:true,
            accessibility: false,
            infinite: true,
            fade: false,
            prevArrow: $(".main-prev"),
            nextArrow: $(".main-next"),
        });
    };


    //ANCHORS
    $("body").on("click", ".js-anchor", function(e){
        e.preventDefault();
        $('.page-anchors__link').removeClass('active')
        $(this).addClass('active');
        var aid = $(this).attr("href");
    	$('html,body').animate({scrollTop: ($(aid).offset().top) - 70},200);
    });



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
        if ($('.package__item').length>0) {
        	$('.accordeon__item').toggleClass('active');
        	$('.accordeon__info').slideToggle();
        } else{
        	$(this).parents('.accordeon__item').toggleClass('active');
        	$(this).next('.accordeon__info').slideToggle();
        }
    });

	//POPUP-VIDEO
    $(".js-play-btn").fancybox({
        speed : 330,
        transitionEffect: "slide", 
        animationEffect: "zoom-in-out", 
        infobar: false,
        clickOutside : 'close',
        smallBtn: true,
        buttons: [
            
        ],
    });
    //POPUP-INLINE
    $(".js-popup-inline").fancybox({
        speed : 330,
        transitionEffect: "slide", 
        animationEffect: "zoom-in-out", 
        infobar: false,
        toolbar  : false,
        smallBtn: true,
        buttons: [

        ],
    });
    //POPUP-GALLERY
	$(".js-gallery").fancybox({
        speed : 330,
        transitionEffect: "slide", 
        animationEffect: "zoom-in-out",
        idleTime: false,
        buttons: [
            
        ],
        smallBtn: true,
        image : {
            protect : true,
        },
        infobar: false,
        hash: false,
        caption : function( instance, item ) {
		    var caption = $(this).find('.default-slider__caption').text() || '';
		    
		    return ( caption.length ? '<div class="gallery-count"><span class="current" data-fancybox-index></span>/<span data-fancybox-count></span></div>' + '<div class="gallery-title">' + caption + '</div>' : '' );
		},
		beforeShow: function() {
	        $('.caption--image').remove();
	    },
	    afterShow: function() {
	        var caption = $(".fancybox-caption"),
	            innerCaption = caption.clone().addClass('caption--image');

	        $(".fancybox-slide--current .fancybox-content").append(innerCaption);
	        caption.not('.caption--image').addClass('caption--bottom');
	    }
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
	        $(this).parents('.page-footer-menu__item').find('.page-footer-menu__list').slideToggle(150);
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

		$(".top-menu-mobile").swipe( {
	        swipeLeft:leftSwipe,
	        //swipeRight:rightSwipe,
	        threshold:0,
	        excludedElements: ".top-menu-mobile__link,.top-menu-add__link"
		});
		function leftSwipe(event){
		    $('.js-top__link--toggle').removeClass('act');
			$('.top-menu-mobile').removeClass('active');
			$('.menu-mobile__bg').fadeOut();
			$('body').removeClass('fixed');
			$('.second-level').removeClass('active');
		}
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


	//только числа
	(function($) {
	  $.fn.inputFilter = function(inputFilter) {
	    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
	      if (inputFilter(this.value)) {
	        this.oldValue = this.value;
	        this.oldSelectionStart = this.selectionStart;
	        this.oldSelectionEnd = this.selectionEnd;
	      } else if (this.hasOwnProperty("oldValue")) {
	        this.value = this.oldValue;
	        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
	      } else {
	        this.value = "";
	      }
	    });
	  };
	}(jQuery));
	$("#slider-count-input").inputFilter(function(value) {
	    return /^\d*$/.test(value);
	});


	//только заданные числа
	// jQuery.fn.ForceNumericOnly =
	// function(){
	//     return this.each(function(){
	//         $(this).keydown(function(e){
	//             var key = e.charCode || e.keyCode || 0;
	//             // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
	//             // home, end, period, and numpad decimal
	//             return (
	//                 key == 1 || 
	//                 key == 3 ||
	//                 key == 6 ||
	//                 key == 9 ||
	//                 key == 12 ||
	//                 key == 15
	//         });
	//     });
	// };
	// $("#slider-term-input").ForceNumericOnly();


	//more-show
    $("body").on("click", ".js-show-more", function(e){
        e.preventDefault();
        $('.index-info__item').show();
        $(this).hide();
    });


    //SLIDER COUNT
	if ($( ".slider-count-slider" ).length>0) {
		$( ".slider-count-slider" ).slider({
	    	animate: true,
	        range: "min",
	        value: 100,
	        min: 100,
	        max: 500000,
	        step: 1,
	        slide: function( event, ui ) {
	            $( "#slider-count-input" ).val( ui.value);
	        },
		});
		$("#slider-count-input").keyup(function() {
		    $(".slider-count-slider").slider("value" , $(this).val())
		});
	};



	//SLIDER TERM
	if ($( ".slider-term-slider" ).length>0) {
		var sliderValue = [0, 1, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
		$( ".slider-term-slider" ).slider({
	    	animate: true,
	        range: "min",
	        value: 1,
	        min: sliderValue[1],
	        max: sliderValue.length - 1,
	        //step: 3,
	        slide: function( event, ui ) {
	            $( "#slider-term-input" ).val(  sliderValue [ ui.value ]);
	            //console.log(sliderValue [ ui.value ])
	        },
		});
		$("#slider-term-input").keyup(function() {
		    $(".slider-term-slider").slider("value" , $(this).val())
		});
	};

	//TABS
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$(this).parents('.tabs-wrap').find('ul.tabs li').removeClass('current');
		$(this).parents('.tabs-wrap').find('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
	$('ul.exchange-tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$(this).parents('.tabs-wrap').find('ul.exchange-tabs li').removeClass('current');
		$('.exchange-tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
	$('ul.conversion-tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$(this).parents('.tabs-wrap').find('ul.conversion-tabs li').removeClass('current');
		$('.conversion-tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

	//TOOLTIP
	if ($('.tooltip').length>0) {
		$('.tooltip').tooltipster({
			animation: 'fade',
   			delay: 100,
		});
	};
	$('.tooltip-toggle').tooltipster({
	    contentCloning: true
	});
	//SLIDER OFFERS
	if ($( ".index-offers__slider" ).length>0) {
		var $slider_off = $('.index-offers__slider');

        $slider_off.slick({
            infinite: false,
            dots: false,
            arrows:true,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: false,
            responsive: [
			    {
			      breakpoint: 1100,
			      settings: {
			        slidesToShow: 2,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 800,
			      settings: {
			        slidesToShow: 1,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 1,
            		slidesToScroll: 1,
            		dots: false,
            		arrows:false,
			      }
			    },
			]
        });

	};

	//SLIDER MONTH
	if ($( ".page-links-month" ).length>0) {
		var $slider_month = $('.page-links-month');

        $slider_month.slick({
            infinite: false,
            dots: false,
            arrows:true,
            slidesToShow: 5,
            slidesToScroll: 1,
            adaptiveHeight: false,
            responsive: [
			    {
			      breakpoint: 1023,
			      settings: {
			        slidesToShow: 9,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 700,
			      settings: {
			        slidesToShow: 7,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 550,
			      settings: {
			        slidesToShow: 3,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 400,
			      settings: {
			        slidesToShow: 2,
            		slidesToScroll: 1,
			      }
			    },
			]
        });

	};


	//SIZE-SLIDER
	if ($( ".size-slider" ).length>0) {
		var $slider_size = $('.size-slider');

		$slider_size.on('init', function (event, slick, direction) {
		    if (!($('.size-slider .slick-slide').length > 2)) {
		        // remove dots
		        $('.slick-dots').hide();
		        $('.size-slider').addClass('noslide');

		    } else{
		    	$slider_size.on('click', '.size-slider__item', function (e){ 
		        	let slideClicked = $(e.currentTarget).attr("data-slick-index"); 
		        	console.log(slideClicked); 
		        	$slider_size.slick('slickGoTo', slideClicked);
		        });
		    }
		});

        $slider_size.slick({
            infinite: true,
            dots: true,
            arrows:true,
            slidesToShow: 4,
            slidesToScroll: 1,
            adaptiveHeight: false,
            responsive: [
            	{
			      breakpoint: 1023,
			      settings: {
			        slidesToShow: 3,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 767,
			      settings: {
			        slidesToShow: 2,
            		slidesToScroll: 1,
            		dots: true,
            		arrows:false,
			      }
			    },
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 1,
            		slidesToScroll: 1,
            		dots: true,
            		arrows:false,
			      }
			    },
			]
        });

        

	};


	//SELECT-CUSTOM
	if ($('.fs').length>0) {
		setTimeout(function() {
		 	$('.fs').styler();
		}, 100)
		
	}


	//SWITCH-TOGGLE
	if ($('.b-switch').length>0) {
		if ( $('.b-switch').is( ".b-switch--checked" ) ) {
		    $( ".office-list" ).show();
		    $( ".map-wrap" ).hide();
		} else{
			$( ".office-list" ).hide();
		    $( ".map-wrap" ).show();
		}
	}
    $("body").on("click", ".b-switch__right", function(e){
        e.preventDefault();
        $(this).parents('.b-switch').toggleClass('b-switch--checked');
        if ( $(this).parents('.b-switch').is( ".b-switch--checked" ) ) {
		    $( ".office-list" ).show();
		    $( ".map-wrap" ).hide();
		} else{
			$( ".office-list" ).hide();
		    $( ".map-wrap" ).show();
		}
    });
    $("body").on("click", ".b-switch__left", function(e){
        e.preventDefault();
        $(this).parents('.b-switch').toggleClass('b-switch--checked');
        if ( $(this).parents('.b-switch').is( ".b-switch--checked" ) ) {
		    $( ".office-list" ).show();
		    $( ".map-wrap" ).hide();
		} else{
			$( ".office-list" ).hide();
		    $( ".map-wrap" ).show();
		}
    });
    $("body").on("click", ".b-switch__block", function(e){
        e.preventDefault();
        $(this).parents('.b-switch').toggleClass('b-switch--checked');
        if ( $(this).parents('.b-switch').is( ".b-switch--checked" ) ) {
		    $( ".office-list" ).show();
		    $( ".map-wrap" ).hide();
		} else{
			$( ".office-list" ).hide();
		    $( ".map-wrap" ).show();
		}
    });



    //TOP-MENU
    $("body").on("click", ".js-timetable-link", function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).next('.timetable-list').slideToggle(170);
    });


    //TABS
	$(".tab_content").hide();
	$("ul.tabs li:first").addClass("active").show();
	$(".tab_content:first").show();

	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();
		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;
	});



	//PAGE-SLIDER
	if ($( ".page-slider" ).length>0) {
		var $slider_p = $('.page-slider');

        $slider_p.slick({
            infinite: false,
            dots: false,
            arrows:true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade:true,
            adaptiveHeight: false,
        });

	};


	//ANOTHER SLIDER
	if ($( ".another__slider" ).length>0) {
		var $slider_off = $('.another__slider');

        $slider_off.slick({
            infinite: true,
            dots: false,
            arrows:true,
            slidesToShow: 4,
            slidesToScroll: 1,
            adaptiveHeight: false,
            responsive: [
            	{
			      breakpoint: 1280,
			      settings: {
			        slidesToShow: 3,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 900,
			      settings: {
			        slidesToShow: 2,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 1,
            		slidesToScroll: 1,
			      }
			    },
			]
        });

	};

	//DEFAULT SLIDER
	if ($( ".default-slider" ).length>0) {
		var $slider_def = $('.default-slider');

        $slider_def.slick({
            infinite: false,
            dots: true,
            arrows:true,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: false,
            responsive: [
			    {
			      breakpoint: 900,
			      settings: {
			        slidesToShow: 2,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 1,
            		slidesToScroll: 1,
            		arrows:false,
			      }
			    },
			]
        });

	};

	//PACKAGE SLIDER
	if ($( ".package-slider" ).length>0) {
		var $slider_off = $('.package-slider');

        $slider_off.slick({
            infinite: true,
            dots: false,
            arrows:true,
            slidesToShow: 4,
            slidesToScroll: 1,
            adaptiveHeight: false,
            responsive: [
            	{
			      breakpoint: 1280,
			      settings: {
			        slidesToShow: 3,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 2,
            		slidesToScroll: 1,
			      }
			    },
			    {
			      breakpoint: 768,
			      settings: {
			        slidesToShow: 1,
            		slidesToScroll: 1,
            		arrows: false,
			      }
			    },
			]
        });
	};

	//deposit-currency-val
	if ($('.currency-radio').length>0) {
		$('.currency-radio [type="radio"]').on('change', function() {
	        var currencyVal = $(this).next('label').text();
			$('.currency-val').text(currencyVal.toUpperCase());
	    });
	}

	$("body").on("click", ".js-awards__toggle", function(e){
        e.preventDefault();
        $(this).next('.awards__info').slideToggle(300);
        $(this).parents('.awards__view').toggleClass('active');
    });


	//SLIDER init
	index__info__sliderInit();
	slider_index_links_init();
	slider_issue_init();



	$("body").on("click", ".js-toggle", function(e){
		if(!$(this).hasClass("active")){
      		e.preventDefault();
		    $(this).addClass('active');
	        $(this).next('.page-aside-row__list').slideDown(250);
		}

		$(this).parents('.page-aside-row').siblings('.page-aside-row').find('.m-toggle').removeClass('active');
        $(this).parents('.page-aside-row').siblings('.page-aside-row').find('.page-aside-row__list').slideUp(250);
    });
});


$(function() {
  	$('.index-offers__link').click(function(e) {
  		e.preventDefault();
	    // Check for active
	    $('.index-offers__link').removeClass('active');
	    $(this).addClass('active');

	    // Display active tab
	    let currentTab = $(this).attr('href');
	    $('.index-offer-content').removeClass('active');
	    $(currentTab).addClass('active');
	    $('.index-offers__slider').slick("slickSetOption", "draggable", true, true);  
  	});
});




$(window).resize(function () {
	index__info__sliderInit();
	slider_index_links_init();
	slider_issue_init();
});

// $(window).load(function(){

// });

// functions
function index__info__sliderInit() {
    var $slider = $('.index-info__slider');
    if($(window).width() > 768) {
    	$slider.on('init', function (event, slick, direction) {
		    if (!($('.index-info__slider .slick-slide').length > 1)) {
		        $('.index-info__slider').addClass('noslide');
		    }
		});
        $slider.not('.slick-initialized').slick({
            infinite: true,
            dots: false,
            arrows:true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: false,
        });

       
    } else{
        if($slider.hasClass('slick-initialized')) {
            $slider.slick("unslick");
        }
    }
}

function slider_index_links_init() {
    var $links = $('.index-links__wrap');
    if($(window).width() < 768) {
        $links.not('.slick-initialized').slick({
            infinite: true,
            dots: false,
            arrows:false,
            slidesToShow: 2,
            slidesToScroll: 1,
             responsive: [
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 1,
            		slidesToScroll: 1,
			      }
			    },
			]
        });
    } else{
        if($links.hasClass('slick-initialized')) {
            $links.slick("unslick");
        }
    }
}

function slider_issue_init() {
    var $issue = $('.issue__list');
    if($(window).width() < 769) {
        $issue.not('.slick-initialized').slick({
            infinite: true,
            dots: false,
            arrows:false,
            slidesToShow: 2,
            slidesToScroll: 1,
             responsive: [
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 1,
            		slidesToScroll: 1,
			      }
			    },
			]
        });
    } else{
        if($issue.hasClass('slick-initialized')) {
            $issue.slick("unslick");
        }
    }
}

$(function() {
	if ($(".page-anchors").length>0) {
		var $anchors   = $(".page-anchors"), 
	        $window    = $(window),
	        offset     = $anchors.offset(),
	        topPadding = 15;

	    $window.scroll(function() {
	        if ($window.scrollTop() > offset.top) {
	            $anchors.addClass('active');
	        } else {
	           $anchors.removeClass('active');
	        }
	    });
	}
    
    
});


// links pages
/*
$('body').append(
	'<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
		<a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px" onclick="$(this).parent().hide()">Close X</a> \
	<style> \
		#pages { padding: 10px 20px 0 50px; font-size: 18px; } \
		#pages a { text-decoration: none; } \
		#pages li { margin: 5px 0; } \
	</style> \
	<ol id="pages"> \
		<li><a href="about.html">About</a></li> \
		<li><a href="index.html">Index</a></li> \
		<li><a href="test.html">Test</a></li> \
		<li><a href="news.html">News</a></li> \
		<li><a href="deposit_list_page_01.html">Deposit1</a></li> \
		<li><a href="deposit_list_page_02.html">Deposit2</a></li> \
		<li><a href="deposit_page.html">Deposit-page</a></li> \
		<li><a href="card.html">Card</a></li> \
		<li><a href="map-page.html">Map-page</a></li> \
		<li><a href="statements.html">Statements</a></li> \
		<li><a href="exchange.html">Exchange</a></li> \
		<li><a href="package.html">Package</a></li> \
		<li><a href="zarplatnie_kartochki.html">Z_kartochki</a></li> \
		<li><a href="zarpatniy_project.html">Z_project</a></li> \
		<li><a href="vote.html">Vote</a></li> \
		<li><a href="awards.html">Awards</a></li> \
	</ol> \
</div>');
*/