(function(a) {
    function d() {
        if (a(".preloader").length) {
            a(".preloader").delay(200).fadeOut(500)
        }
    }
    function e() {
        if (a(".main-header").length) {
            var o = a(window).scrollTop();
            var n = a(".main-header");
            var m = a(".scroll-top");
            if (o >= 250) {
                n.addClass("fixed-header");
                m.fadeIn(300)
            } else {
                n.removeClass("fixed-header");
                m.fadeOut(300)
            }
        }
    }
    e();
    var j = 992;
    var k = a(".navigation li.dropdown");
    a(window).on("resize",
    function() {
        k.children("ul").hide()
    });
    k.hover(function() {
        if (a(window).innerWidth() >= j) {
            a(this).children("ul").stop(true, false, true).slideToggle(300)
        }
    });
    if (a(".main-header .navigation li.dropdown ul").length) {
        a(".main-header .navigation li.dropdown").append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
        a(".main-header .navigation li.dropdown .dropdown-btn").on("click",
        function() {
            a(this).prev("ul").slideToggle(500)
        });
        a(".navigation li.dropdown > a").on("click",
        function(m) {
            m.preventDefault()
        })
    }
    if (a(".hidden-bar,.fullscreen-menu").length) {
        var f = a(".hidden-bar");
        var i = a(".nav-toggler-two");
        var g = a(".hidden-bar-closer,.close-menu");
        a(".hidden-bar-wrapper").mCustomScrollbar();
        i.on("click",
        function() {
            a("body").addClass("visible-menu-bar");
            f.addClass("visible-sidebar")
        });
        g.on("click",
        function() {
            a("body").removeClass("visible-menu-bar");
            f.removeClass("visible-sidebar")
        })
    }
    function h() {
        var m = a(".hidden-bar .side-menu");
        m.find(".dropdown").children("a").append(function() {
            return '<button type="button" class="btn expander"><i class="icon fa fa-angle-right"></i></button>'
        });
        m.find(".dropdown").children("ul").hide();
        m.find(".btn.expander").each(function() {
            a(this).on("click",
            function() {
                a(this).parent().parent().children("ul").slideToggle();
                a(this).parent().toggleClass("current");
                a(this).find("i").toggleClass("fa-angle-right fa-angle-down");
                return false
            })
        })
    }
    h();
    if (a(".main-slider-carousel").length) {
        a(".main-slider-carousel").owlCarousel({
            loop: true,
            items: 1,
            margin: 0,
            nav: true,
            animateOut: "slideOutDown",
            animateIn: "fadeIn",
            active: true,
            smartSpeed: 1000,
            autoplay: 5000,
            navText: ['<span class="icon-down-arrow">Prev</span>', '<span class="icon-down-arrow">Next</span>']
        })
    }
    if (a(".filter-list").length) {
        a(".filter-list").mixItUp({})
    }
    if (a(".quantity-spinner").length) {
        a("input.quantity-spinner").TouchSpin({
            verticalbuttons: true
        })
    }
    if (a(".testimonial-carousel").length) {
        a(".testimonial-carousel").owlCarousel({
            loop: true,
            items: 1,
            margin: 0,
            nav: true,
            smartSpeed: 1000,
            autoplay: 5000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>']
        })
    }
    if (a(".count-box").length) {
        a(".count-box").appear(function() {
            var m = a(this),
            o = m.find(".count-text").attr("data-stop"),
            p = parseInt(m.find(".count-text").attr("data-speed"), 10);
            if (!m.hasClass("counted")) {
                m.addClass("counted");
                a({
                    countNum: m.find(".count-text").text()
                }).animate({
                    countNum: o
                },
                {
                    duration: p,
                    easing: "linear",
                    step: function() {
                        m.find(".count-text").text(Math.floor(this.countNum))
                    },
                    complete: function() {
                        m.find(".count-text").text(this.countNum)
                    }
                })
            }
        },
        {
            accY: 0
        })
    }
    if (a(".tabs-box").length) {
        a(".tabs-box .tab-buttons .tab-btn").on("click",
        function(m) {
            m.preventDefault();
            var n = a(a(this).attr("data-tab"));
            if (a(n).is(":visible")) {
                return false
            } else {
                n.parents(".tabs-box").find(".tab-buttons").find(".tab-btn").removeClass("active-btn");
                a(this).addClass("active-btn");
                n.parents(".tabs-box").find(".tabs-content").find(".tab").fadeOut(0);
                n.parents(".tabs-box").find(".tabs-content").find(".tab").removeClass("active-tab");
                a(n).fadeIn(300);
                a(n).addClass("active-tab")
            }
        })
    }
    if (a(".single-item-carousel").length) {
        a(".single-item-carousel").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 1000,
            autoplay: 5000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 1
                },
                1200 : {
                    items: 1
                }
            }
        })
    }
    if (a(".two-item-carousel").length) {
        a(".two-item-carousel").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 700,
            autoplay: 4000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 1
                },
                800 : {
                    items: 1
                },
                1024 : {
                    items: 2
                },
                1200 : {
                    items: 2
                }
            }
        })
    }
    if (a(".three-item-carousel").length) {
        a(".three-item-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            navText: ['<span class="icon-arrow icon-rotate"></span>', '<span class="icon-arrow"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 1
                },
                800 : {
                    items: 2
                },
                1024 : {
                    items: 3
                },
                1200 : {
                    items: 3
                },
            }
        })
    }
    if (a(".four-item-carousel").length) {
        a(".four-item-carousel").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 700,
            autoplay: 4000,
            navText: ['<span class="icon-arrow icon-rotate"></span>', '<span class="icon-arrow"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 2
                },
                800 : {
                    items: 2
                },
                1024 : {
                    items: 3
                },
                1200 : {
                    items: 4
                }
            }
        })
    }
    if (a(".four-item-fluidcarousel").length) {
        a(".four-item-fluidcarousel").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 700,
            autoplay: 4000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                800 : {
                    items: 2
                },
                1024 : {
                    items: 3
                },
                1500 : {
                    items: 4
                }
            }
        })
    }
    if (a(".five-item-carousel").length) {
        a(".five-item-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 700,
            autoplay: 4000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 2
                },
                800 : {
                    items: 3
                },
                1024 : {
                    items: 4
                },
                1200 : {
                    items: 5
                }
            }
        })
    }
    if (a(".six-item-carousel").length) {
        a(".six-item-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 700,
            autoplay: 4000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                480 : {
                    items: 2
                },
                767 : {
                    items: 3
                },
                900 : {
                    items: 4
                },
                1024 : {
                    items: 5
                },
                1200 : {
                    items: 6
                }
            }
        })
    }
    if (a(".cases-tab").length) {
        a(".cases-tab .cases-tab-btns .p-tab-btn").on("click",
        function(m) {
            m.preventDefault();
            var n = a(a(this).attr("data-tab"));
            if (a(n).hasClass("actve-tab")) {
                return false
            } else {
                a(".cases-tab .cases-tab-btns .p-tab-btn").removeClass("active-btn");
                a(this).addClass("active-btn");
                a(".cases-tab .p-tabs-content .p-tab").removeClass("active-tab");
                a(n).addClass("active-tab")
            }
        })
    }
    if (a(".cases-carousel").length) {
        a(".cases-carousel").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 2
                },
                900 : {
                    items: 3
                },
                1024 : {
                    items: 3
                },
                1200 : {
                    items: 3
                },
            }
        })
    }
    if (a(".client-tab").length) {
        a(".client-tab .client-tab-btns .c-tab-btn").on("click",
        function(m) {
            m.preventDefault();
            var n = a(a(this).attr("data-tab"));
            if (a(n).hasClass("actve-tab")) {
                return false
            } else {
                a(".client-tab .client-tab-btns .c-tab-btn").removeClass("active-btn");
                a(this).addClass("active-btn");
                a(".client-tab .c-tabs-content .c-tab").removeClass("active-tab");
                a(n).addClass("active-tab")
            }
        })
    }
    if (a(".banner-tab").length) {
        a(".banner-tab .banner-tab-btns .b-tab-btn").on("click",
        function(m) {
            m.preventDefault();
            var n = a(a(this).attr("data-tab"));
            if (a(n).hasClass("actve-tab")) {
                return false
            } else {
                a(".banner-tab .banner-tab-btns .b-tab-btn").removeClass("active-btn");
                a(this).addClass("active-btn");
                a(".banner-tab .b-tabs-content .b-tab").removeClass("active-tab");
                a(n).addClass("active-tab")
            }
        })
    }
    if (a(".client-carousel").length) {
        a(".client-carousel").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 1
                },
                900 : {
                    items: 1
                },
                1024 : {
                    items: 1
                },
                1200 : {
                    items: 1
                },
            }
        })
    }
    if (a(".services-carousel").length) {
        a(".services-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            smartSpeed: 700,
            center: true,
            autoplay: 5000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 1
                },
                800 : {
                    items: 2
                },
                1024 : {
                    items: 3
                },
                1200 : {
                    items: 3
                },
            }
        })
    }
    if (a(".testimonial-carousel-two").length) {
        a(".testimonial-carousel-two").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 1
                },
                800 : {
                    items: 2
                },
                1024 : {
                    items: 3
                },
                1200 : {
                    items: 3
                },
            }
        })
    }
    if (a(".service-carousel-two").length) {
        a(".service-carousel-two").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 1
                },
                800 : {
                    items: 2
                },
                1024 : {
                    items: 3
                },
                1200 : {
                    items: 3
                },
            }
        })
    }
    if (a(".project-carousel").length) {
        a(".project-carousel").owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 700,
            autoplay: 5000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0 : {
                    items: 1
                },
                600 : {
                    items: 2
                },
                800 : {
                    items: 2
                },
                1024 : {
                    items: 3
                },
                1200 : {
                    items: 4
                }
            }
        })
    }
    if (a(".project-tab").length) {
        a(".project-tab .product-tab-btns .p-tab-btn").on("click",
        function(m) {
            m.preventDefault();
            var n = a(a(this).attr("data-tab"));
            if (a(n).hasClass("actve-tab")) {
                return false
            } else {
                a(".project-tab .product-tab-btns .p-tab-btn").removeClass("active-btn");
                a(this).addClass("active-btn");
                a(".project-tab .p-tabs-content .p-tab").removeClass("active-tab");
                a(n).addClass("active-tab")
            }
        })
    }
    function c() {
        if (a(".masonry-gallery").length) {
            var p = a(window);
            var m = a(".masonry-gallery .items-container");
            var n = a(".filter-btns");
            m.isotope({
                filter: "*",
                masonry: {
                    columnWidth: 0
                },
                animationOptions: {
                    duration: 500,
                    easing: "linear"
                }
            });
            n.find("li").on("click",
            function() {
                var r = a(this).attr("data-filter");
                try {
                    m.isotope({
                        filter: r,
                        animationOptions: {
                            duration: 500,
                            easing: "linear",
                            queue: false
                        }
                    })
                } catch(q) {}
                return false
            });
            p.bind("resize",
            function() {
                var q = n.find("li.active").attr("data-filter");
                m.isotope({
                    filter: q,
                    animationOptions: {
                        duration: 500,
                        easing: "linear",
                        queue: false
                    }
                })
            });
            var o = a(".filter-btns li");
            o.on("click",
            function() {
                var q = a(this);
                if (!q.hasClass("active")) {
                    o.removeClass("active");
                    q.addClass("active")
                }
            })
        }
    }
    c();
    if (a(".isotope_block").length) {
        a(".isotope_block").isotope({
            layoutMode: "masonry"
        })
    }
    if (a(".accordion-box").length) {
        a(".accordion-box").on("click", ".acc-btn",
        function() {
            var m = a(this).parents(".accordion-box");
            var n = a(this).parents(".accordion");
            if (a(this).hasClass("active") !== true) {
                a(m).find(".accordion .acc-btn").removeClass("active")
            }
            if (a(this).next(".acc-content").is(":visible")) {
                return false
            } else {
                a(this).addClass("active");
                a(m).children(".accordion").removeClass("active-block");
                a(m).find(".accordion").children(".acc-content").slideUp(300);
                n.addClass("active-block");
                a(this).next(".acc-content").slideDown(300)
            }
        })
    }
    if (a(".lightbox-image").length) {
        a(".lightbox-image").fancybox({
            openEffect: "fade",
            closeEffect: "fade",
            helpers: {
                media: {}
            }
        })
    }
    if (a(".select-menu").length) {
        a(".select-menu").selectmenu()
    }
    if (a(".price-ranger").length) {
        a(".price-ranger #slider-range").slider({
            range: true,
            min: 10,
            max: 200,
            values: [11, 99],
            slide: function(m, n) {
                a(".price-ranger .ranger-min-max-block .min").val("$" + n.values[0]);
                a(".price-ranger .ranger-min-max-block .max").val("$" + n.values[1])
            }
        });
        a(".price-ranger .ranger-min-max-block .min").val("$" + a(".price-ranger #slider-range").slider("values", 0));
        a(".price-ranger .ranger-min-max-block .max").val("$" + a(".price-ranger #slider-range").slider("values", 1))
    }
    if (a(".quantity-spinner").length) {
        a("input.quantity-spinner").TouchSpin({
            verticalbuttons: true
        })
    }
    if (a(".time-countdown").length) {
        a(".time-countdown").each(function() {
            var n = a(this);
            var m = n.data("countdown-time");
            n.countdown(m,
            function(o) {
                a(this).html("<h2>" + o.strftime("%D : %H : %M : %S") + "</h2>")
            })
        })
    }
    if (a(".time-countdown-two").length) {
        a(".time-countdown-two").each(function() {
            var n = a(this);
            var m = n.data("countdown-time");
            n.countdown(m,
            function(o) {
                a(this).html('<li> <div class="box"> <span class="days">' + o.strftime("%D") + '</span> <span class="timeRef">days</span> </div> </li> <li> <div class="box"> <span class="hours">' + o.strftime("%H") + '</span> <span class="timeRef">hours</span> </div> </li> <li> <div class="box"> <span class="minutes">' + o.strftime("%M") + '</span> <span class="timeRef">minutes</span> </div> </li> <li> <div class="box"> <span class="seconds">' + o.strftime("%S") + '</span> <span class="timeRef">seconds</span> </div> </li>')
            })
        })
    }
    if (a(".progress-levels .progress-box .bar-fill").length) {
        a(".progress-levels .progress-box .bar-fill").each(function() {
            var m = a(this).attr("data-percent");
            a(this).css("width", m + "%");
            a(this).children(".percent").html(m + "%")
        })
    }
    if (a(".progress-levels-two .progress-box .bar-fill").length) {
        a(".progress-levels-two .progress-box .bar-fill").each(function() {
            a(".progress-box .bar-fill").appear(function() {
                var m = a(this).attr("data-percent");
                a(this).css("height", m + "%")
            })
        },
        {
            accY: 0
        })
    }
    if (a(".scroll-to-target").length) {
        a(".scroll-to-target").on("click",
        function() {
            var m = a(this).attr("data-target");
            a("html, body").animate({
                scrollTop: a(m).offset().top
            },
            1000)
        })
    }
    a(".my-background-video").bgVideo({
        showPausePlay: false,
        pauseAfter: 1200
    });
    if (a(".selectmenu").length) {
        a(".selectmenu").selectmenu();
        var b = function(m, n) {
            a(this).trigger("change", n)
        };
        a(".selectmenu").selectmenu({
            change: b
        })
    }
    if (a(".wow").length) {
        var l = new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: true,
            live: true
        });
        l.init()
    }
    a(window).on("scroll",
    function() {
        e()
    });
    a(window).on("load",
    function() {
        d();
        c()
    })
})(window.jQuery);