/**
 * Created by madla on 8/17/2018.
 */
var $canvas
function handlePreloader() {
    if ($('.preloader').length) {
        $('body').removeClass('active-preloader-ovh');
        $('.preloader').fadeOut();
    }
}
function appScreenshotCarousel() {
    if ($('.appScreenshotCarousel-container').length) {

        var swiper = new Swiper('.appScreenshotCarousel-container', {
            autoplay: {
                delay: 2000
            },
            effect: 'coverflow',
            loop: true,
            centeredSlides: true,
            slidesPerView: 4,
            initialSlide: 0,
            keyboardControl: true,
            mousewheelControl: false,
            lazyLoading: true,
            preventClicks: false,
            preventClicksPropagation: false,
            lazyLoadingInPrevNext: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 250,
                modifier: .5,
                slideShadows: false,
            },
            breakpoints: {
                1199: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                991: {
                    slidesPerView: 2.5,
                    spaceBetween: 26,
                },
                767: {
                    slidesPerView: 1.8,
                    spaceBetween: 50,
                },
                575: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                }
            }
        });

    }
}
function statsCounter(id, end) {

    var numAnim = new CountUp(id, 0, end);
    if (!numAnim.error) {
        numAnim.start();
    } else {
        console.error(numAnim.error);
    }
}
function scroll(multiplier) {
    if ($("#toggleCarousel").hasClass("rtl")) {
        if (multiplier == 1) {
            $canvas.animate({left: 0});
        } else if (multiplier == 2) {
            $canvas.animate({left: 260});
        } else if (multiplier == 3) {
            $canvas.animate({left: 520});

        }

    } else {
        if (multiplier == 1) {
            $canvas.animate({left: 0});
        } else if (multiplier == 2) {
            $canvas.animate({left: -260});
        } else if (multiplier == 3) {
            $canvas.animate({left: -520});

        }

    }
}
$('.iphoneSliderNavigation').click(function () {
    var multiplier = parseInt($(this).data("distance"));
    if ($(".carousel"))
        scroll(multiplier)

});
$(window).scroll(function () {
    var wScroll = $(this).scrollTop();
    $('#header_scatter').css({
        'transform': 'translate(0px, ' + wScroll / 25 + '%)'
    });
    $('#header_iphone').css({
        'transform': 'translate(0px, ' + wScroll / 15 + '%)'
    });
    $('.header_ribbon').css({
        'transform': 'translate(0px, ' + wScroll / 5 + '%)'
    });
})

$(function () {



});

$(document).on("ready", handlePreloader)
$(document).ready(function () {
    $("#mainNav").hide();
    console.log(platform.os); // 'IE'
    if (platform.os.family == "iOS") {
        $("header .btn-download.active").attr("href", "https://itunes.apple.com/us/app/easygifts/id1330770578?ls=1&mt=8");
    } else if (platform.os.family == "Android") {
        $("header .btn-download.active").attr("href", "https://play.google.com/store/apps/details?id=com.easygift");
    }
    $canvas = $("div.canvas");
    appScreenshotCarousel();
    statsCounter("starsStat", 1834);
    statsCounter("likesStat", 1940);
    statsCounter("downloadStat", 1000);
    statsCounter("usersStat", 9234);
    // Optimalisation: Store the references outside the event handler:
    var $window = $(window);
    var $pane = $('#pane1');

    var windowsize = $window.width();

    function checkWidth() {
        windowsize = $window.width();
        if (windowsize < 768) {
            $("#mainNav").slideDown();
            $("#scrollTop").show();
        } else {
            if ($window.scrollTop() < 500) {
                $("#mainNav").hide();
                $("#scrollTop").hide();

            }
        }
        console.log("window resize !")
    }

    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);

    $(window).scroll(function () {

        if (windowsize > 768) {
            // set distance user needs to scroll before we start fadeIn
            if ($(this).scrollTop() > 500) {
                $('#mainNav').slideDown();
                $("#scrollTop").fadeIn();
            } else {
                $('#mainNav').fadeOut();
                $("#scrollTop").fadeOut();
            }
        }
    });


    $('#featuresCarousel').slick({ //add in your correct containing element
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: '<button class="carousel-control-prev" > <img src="images/left-chevron.svg" width="25px" alt=""> <span class="sr-only">Previous</span></button>',
        prevArrow: '<button class="carousel-control-next" style="z-index: 100"><img src="images/right-chevron.svg" width="25px" alt=""><span class="sr-only">Next</span></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]

    });
    /* show lightbox when clicking a thumbnail */
    $('a.thumb').click(function (event) {
        event.preventDefault();
        var content = $('.modal-body');
        content.empty();
        var title = $(this).attr("title");
        $('.modal-title').html(title);
        content.html($(this).html());
        $(".modal-profile").modal({show: true});
    });
    // hide .navbar first

// Gets the video src from the data-src on each button

    var $videoSrc;
    $('#video_placeholder').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);


// when the modal is opened autoplay it
    $('#videoModal').on('shown.bs.modal', function (e) {

// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
        $("#video").attr('src', $videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1");
    })


// stop playing the youtube video when I close the modal
    $('#videoModal').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#video").attr('src', $videoSrc);
    })
    $("div[id^=art]").on("click", function (event) {
        $(this).css("color", "#111");
        $(this).siblings().css("color", "#656565");
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
    });
});


