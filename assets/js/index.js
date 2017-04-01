/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        // Stop main header from resizing when scrolling on tablets:
        var md = new MobileDetect(window.navigator.userAgent);

        if (md.tablet()) {
            var headerHeightLandscape;
            var headerHeightPortrait;

            // If orientation is landscape:
            if (screen.orientation.angle === 0 || screen.orientation.angle === 180) {
                headerHeightLandscape = $('.main-header').css('height');
                $('.main-header').css('height', headerHeightLandscape);
            }
            // If orientation is portrait:
            else {
                headerHeightPortrait = $('.main-header').css('height');
                $('.main-header').css('height', headerHeightPortrait);
            }
        }

        // Fade-in main header background image:
        $('.main-header').imagesLoaded( { background: true }, function() {
            $('.main-header-background-square').css('background-color', 'transparent');
        });

        // Show main header's title and description when background image is visible:
        $(".home-template .main-header-background-square")
            .on("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd", function(e) {
                $('.home-template .page-title, .home-template .page-description').css('display', 'inherit');
            });

        // When window is resized make sure title and description are visible:
        $(window).resize(function () {
            $('.home-template .page-title, .home-template .page-description').css('display', 'inherit');
        });

        // Fade-in logo when image is loaded:
        $('.blog-logo img').imagesLoaded(function() {
            $('.blog-logo img').css('display', 'inherit');
        });

        // Remove animation from menu when visible for first time:
        $('.nav-closed .menu-button').click(function() {
            $(this).css('animation', 'none');
        });

        // Show author image when image is loaded:
        $('.author-image .img').imagesLoaded( { background: true }, function() {
            $('.author-image').css('visibility', 'visible');
        });

    });

    /* ==========================================================================
  	   Run Highlight
  	   ========================================================================== */

    function highlight() {
			$('pre code').each(function(i, e) {
				hljs.highlightBlock(e);
				var code = $(this);
				if(!$(e).hasClass('language-plain')) {
					var lines = code.html().split(/\n/).length;
					var numbers = [];
					for (i = 1; i < lines; i++) {
						numbers += '<span class="line">' + i + '</span>';
					}
					code.parent().addClass('codeblock').append('<div class="lines">' + numbers + '</div>');
				}
			});
		}
		highlight();

  /* ==========================================================================
	   Initialize and load Disqus
	   ========================================================================== */

		function comments() {
			if (typeof disqus === 'undefined' || !document.getElementById('disqus_thread')) {
				$('.post-comments').css({
					'display' : 'none'
				});
			} else {
				if (window.DISQUS) {
					return DISQUS.reset({
						reload: true,
						config: function () {
							this.page.identifier = location.pathname;
							this.page.url = location.origin + location.pathname;
						}
					});
				}

				$.ajax({
					type: "GET",
					url: "//" + disqus + ".disqus.com/embed.js",
					dataType: "script",
					cache: true
				});
			}
		}
		comments();

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);
