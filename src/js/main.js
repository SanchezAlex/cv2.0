(function ($) {

    var controller = new ScrollMagic.Controller();

    var slides = ["#section01", "#section02", "#section03", "#setion04", "#section05", "#section06"];

    var headers = ["#section01 header", "#section02 header", "#section03 header", "#section04 header", "#section05 header", "#section06 header"];

    var breakSections = ["#about-me"];

    var animateMouse = new TimelineMax({repeat: -1, delay: 2});

    animateMouse
        .add(TweenLite.to("#scroll__point", 1, {autoAlpha: 1, ease: Power0.easeInOut, fill: "#e6e6e6", delay: 0.5}))
        .add(TweenLite.to("#scrolldown__icon-2", 1.5, {autoAlpha: 1, ease: Power0.easeInOut, stroke: "#e6e6e6"}));

    var loadedCount = 0;
    var imagesToLoad = $('.bcground').length;
    var loadingProgress = 0;

    $('.bcground').imagesLoaded({
            background: true
        }
    ).progress( function( instance, image ) {
        loadProgress();
    });

    function loadProgress(imgLoad, image)
    {
        loadedCount++;

        loadingProgress = (loadedCount/imagesToLoad);

        TweenLite.to(progressTl, 0.7, {progress:loadingProgress, ease:Linear.easeNone});

    }

    var progressTl = new TimelineMax({paused:true,onUpdate:progressUpdate,onComplete:loadComplete});

    progressTl
        .to($('.progress span'), 1, {width:100, ease:Linear.easeNone});

    function progressUpdate()
    {
        loadingProgress = Math.round(progressTl.progress() * 100);
        $('.percentage').text(loadingProgress + '%');

    }

    function loadComplete() {

        var preloaderOutTl = new TimelineMax();

        preloaderOutTl
            .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
            .to($('.percentage'), 0.3, {y: 100, autoAlpha: 0, ease:Back.easeIn}, 0.1)
            .set($('body'), {className: '-=loading'})
            .set($('#intro'), {className: '+=loaded'})
            .to($('#preloader'), 0.7, {yPercent: 100, ease:Power4.easeInOut})
            .set($('#preloader'), {className: '+=hidden'})
            .from($('.thumb-ava'), 1.5, {y:-450, rotation:-450, transformOrigin:"50% 50%", ease:Elastic.easeOut})
            .from($('.intro-block h1'), 0.5, {left:1000, autoAlpha:0})
            .from($('.intro-block h3'), 0.3, {right:1000, autoAlpha:0})
            .from($('.intro-block-line'), 0.4, {autoAlpha:0})
            .staggerFrom($('.intro-social-buttons li'), 0.5, {autoAlpha:0, scale:0, rotation:-180})
            .staggerTo($('.intro-social-buttons li'), 0.3, {autoAlpha:0, scale:0.8}, 0.3, 0.7)
            .staggerFrom($('nav li'), 0.5, {top:100, opacity:0, delay:0.5, ease:Back.easeOut}, 0.1)
            .from($('.scroll'), 0.3, {y: -20, autoAlpha: 0, ease:Power1.easeOut});

        return preloaderOutTl;

    }

    if (Modernizr) {

        // Set 'is-active' to headers
        headers.forEach(function (header, index) {

            var num = index+1;

            var headerScene = new ScrollMagic.Scene({
                triggerElement: header,
                offset: -95
            })
                .setClassToggle('#section0'+num, 'is-active')
                .addTo(controller);
        });

        // Set 'is-active' to break id
        breakSections.forEach(function (breakSection, index) {

            var breakID = $(breakSection).attr('id');

            var breakScene = new ScrollMagic.Scene({
                triggerElement: breakSection,
                triggerHook: 0.75
            })
                .setClassToggle('#'+breakID, 'is-active')
                .addTo(controller);
        });

        // Bcground effects
        slides.forEach(function (slide, index) {

            var $bcg = $(slide).find('.bcground');

            var slideParallaxScene = new ScrollMagic.Scene({
                triggerElement: slide,
                triggerHook: 1,
                duration: "100%"
            })
                .setTween(TweenMax.from($bcg, 1, {y: '-40%', autoAlpha: 0.3, ease:Power0.easeNone}))
                .addTo(controller);
        });

        // Intro slide effect
        var introTl = new TimelineMax();

        introTl
            .to($('#intro header, .scroll'), 0.2, {autoAlpha: 0, ease:Power1.easeNone})
            .to($('#intro'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone}, 0);

        var introScene = new ScrollMagic.Scene({
            triggerElement: '#intro',
            triggerHook: 0,
            duration: "100%"
        })
            .setTween(introTl)
            .addTo(controller);

        controller.scrollTo(function (newpos) {
            TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease:Power1.easeInOut});
        });

        $(document).on("click", "a[href^='#']", function (e) {
            var id = $(this).attr("href");
            if ($(id).length > 0) {
                e.preventDefault();

                controller.scrollTo(id);

                if (window.history && window.history.pushState) {
                    history.pushState("", document.title, id);
                }
            }
        });
    }

    $(document).on('focusout', '.input-field', function() {
        if ($.trim($(this).val()) !== '') {
            $(this).parent().addClass('input-filled');
        }
        else {
            $(this).parent().removeClass('input-filled');
        }
    });


    // Fancybox settings
    $('.fancybox-portfolio').fancybox({
        openEffect	: 'fade',
        closeEffect	: 'fade',
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    $('.fancybox-cert').fancybox({
        openEffect  : 'elastic',
        closeEffect : 'elastic',
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    // Load Google map
    $(document).ready(window.initMap = function() {

        (function () {
            var myLocation = new google.maps.LatLng(50.474118, 30.515123);
            var mapOptions = {
                center: myLocation,
                zoom: 10
            };
            var marker = new google.maps.Marker({
                position: myLocation,
                title: "Property Location"
            });
            var map = new google.maps.Map(document.getElementById("address-map"),
                mapOptions);
            marker.setMap(map);
        })();
    });

}(jQuery));