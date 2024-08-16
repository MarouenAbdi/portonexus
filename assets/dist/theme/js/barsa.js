$(document).ready(function () {
	$('nav').addClass('transitionNav');

	$('body').append(
		'<div class="backToTop"><i class="fa-solid fa-arrow-up"></i></div>'
	);

	var heroSlider = new Swiper('.heroSlider', {
		direction: 'vertical',
		navigation: {
			nextEl: '.button-next',
			prevEl: '.button-prev',
		},
	});

	function menu(menuIcon) {
		menuIcon.parent().toggleClass('menuActive');
	}
	$('.menuIcon').on('click', function () {
		menu((menuIcon = $(this)));
	});

	const ScrollArea = document.getElementById('scroll-content');
	const options = {
		damping: 0.1,
		speed: 1,
		// renderByPixel: true,
		continuousScrolling: true,
		syncCallbacks: true,
		alwaysShowTracks: false,
	};
	var scrollbar = Scrollbar.init(ScrollArea, options);

	// gsap register Scroll Trigger & Smooth-scroll
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

	scrollbar.addListener(ScrollTrigger.update);
	ScrollTrigger.defaults({ scroller: ScrollArea });

	ScrollTrigger.scrollerProxy('#scroll-content', {
		scrollTop(value) {
			if (arguments.length) {
				scrollbar.scrollTop = value;
			}
			return scrollbar.scrollTop;
		},
	});
	scrollbar.addListener(ScrollTrigger.update);
	ScrollTrigger.defaults({ scroller: ScrollArea });

	let slideLeft = gsap.timeline({
		scrollTrigger: {
			trigger: '.barsa-pricing',
			scrub: true,
			start: 'bottom center',
		},
	});
	slideLeft.from('.slideLeft', {
		opacity: 0,
		x: 150,
	});
	let counterTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: '.progress-text',
			start: 'top center',
		},
	});
	// counter animations
	const progressCounter = $('.counter .count span');

	counterTimeline.from(progressCounter, {
		textContent: 0,
		duration: 4,
		snap: { textContent: 1 },
		// stagger: 1,
	});

	// scroll to
	$('.header-Nav li a').each(function (e) {
		const target = $(this).attr('href');
		const targetEl = $(target);
		const targetRect = targetEl.offset();

		$(this).on('click', function (e) {
			menu($('.menuIcon'));
			var setOffset = -120;

			e.preventDefault();
			gsap.to(scrollbar, {
				scrollTo: targetRect.top + setOffset,
				duration: 2.5,
				ease: 'power4.inOut',
				onCompleteParams: [targetRect.top],
			});

			$('.aiana-menu li a').removeClass('active');
			$(this).addClass('active');
		});
	});

	scrollbar.addListener((status) => {
		const offset = status.offset;

		if (offset.y >= 500) {
			$('nav').addClass('sticky');
			$('.sticky').css('top', offset.y + 'px');
			$('.backToTop').css({ opacity: '1', transform: 'translateY(0px)' });
			setTimeout(() => {
				$('nav').removeClass('transitionNav');
			}, 1000);
		} else {
			$('nav').css('top', 0 + 'px');
			$('nav').removeClass('sticky');
			$('.backToTop').css({ opacity: '0', transform: 'translateY(100%)' });
			$('nav').addClass('transitionNav');
		}
		$('.mobNavInner').css('top', offset.y + 'px');
		$('.popUpmain').css('top', offset.y + 'px');
	});

	$('.backToTop').on('click', function (e) {
		const target = $('#top');
		const targetEl = $(target);
		const targetRect = targetEl.offset();
		e.preventDefault();
		gsap.to(scrollbar, {
			scrollTo: targetRect.top,
			duration: 2.5,
			ease: 'power4.inOut',
			onCompleteParams: [targetRect.top],
		});
	});

	$('.barsa-button3').mousemove(function (event) {
		var mouseX = event.pageX - $(this).offset().left;
		var mouseY = event.pageY - $(this).offset().top;

		var buttonWidth = $(this).outerWidth();
		var buttonHeight = $(this).outerHeight();

		$(this).css({
			top: mouseY - buttonHeight / 2 + 'px',
			left: mouseX - buttonWidth / 2 + 'px',
		});

		console.log('Mouse X: ' + mouseX + ', Mouse Y: ' + mouseY);
	});

	$('.barsa-button3').mouseleave(function () {
		$(this).css({ top: 0 + 'px', left: 0 + 'px' });
	});

	var testimonials = new Swiper('.testimonialsSlider', {
		slidesPerView: 4,
		spaceBetween: 24,
		navigation: {
			nextEl: '.team-next',
			prevEl: '.team-prev',
		},
		autoplay: {
			delay: 1500,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.testimonial-pagination',
			clickable: true,
		},
		breakpoints: {
			1024: {
				slidesPerView: 4,
				spaceBetween: 18,
			},

			576: {
				slidesPerView: 2,
				spaceBetween: 18,
			},

			320: {
				slidesPerView: 1,
				spaceBetween: 12,
			},
		},
	});

	$('#barsaFaq').on('show.bs.collapse', function (e) {
		$('.accordion-item').removeClass('active');
		$(e.target).closest('.accordion-item').addClass('active');
	});

	$('#barsaFaq').on('hide.bs.collapse', function (e) {
		$(e.target).closest('.accordion-item').removeClass('active');
	});
});
