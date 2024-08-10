$(document).ready(function () {
  var loader = 100;
  var i = 0;

  var interval = setInterval(function () {
    if (i <= loader) {
      $(".loaderBar").css("height", i + "%");
      $(".loaderText").css("height", i + "%");
      $(".loaderText").text(i + "%");
      i++;
    } else {
      clearInterval(interval);
      $(".loader").addClass("loaded");

      setTimeout(function () {
        $(".popUpmain").addClass("d-flex");
        setTimeout(function () {
          $(".popWrapper").removeClass("slideTopRev");
          $(".popWrapper").addClass("slideTop");
        });
      }, 3000);
    }
  }, 50);

  $("nav").addClass("transitionNav");

  $("body").append(
    '<div class="backToTop"><i class="fa-solid fa-arrow-up"></i></div>'
  );

  function menu(menuIcon) {
    menuIcon.parent().toggleClass("menuActive");
  }
  $(".menuIcon").on("click", function () {
    menu((menuIcon = $(this)));
  });

  const ScrollArea = document.getElementById("scroll-content");
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

  ScrollTrigger.scrollerProxy("#scroll-content", {
    scrollTop(value) {
      if (arguments.length) {
        scrollbar.scrollTop = value;
      }
      return scrollbar.scrollTop;
    },
  });
  scrollbar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: ScrollArea });

  gsap.utils.toArray(".gifAnimate").forEach((gif) => {
    let showGif = gsap.timeline({
      scrollTrigger: {
        trigger: gif,
        start: "top center",
        onEnter: () => gif.classList.add("d-block"),
      },
    });
  });

  gsap.utils.toArray(".serviceSingle img").forEach((img) => {
    let showGif = gsap.timeline({
      scrollTrigger: {
        trigger: ".barsa-form",
        scrub: true,
        start: "center center",
        // onEnter: () => img.classList.add("animate"),
      },
    });

    showGif.from(img, {
      opacity: 0,
      scale: 0.5,
      x: -100,
      y: 100,
    });
  });

  gsap.utils.toArray(".pricingSingle img").forEach((img) => {
    let showGif = gsap.timeline({
      scrollTrigger: {
        trigger: ".progress-text",
        scrub: true,
        start: "bottom center",
      },
    });

    showGif.from(img, {
      opacity: 0,
      scale: 0.5,
      x: -100,
      y: 100,
    });
  });

  let slideLeft = gsap.timeline({
    scrollTrigger: {
      trigger: ".barsa-pricing",
      scrub: true,
      start: "bottom center",
    },
  });
  slideLeft.from(".slideLeft", {
    opacity: 0,
    x: 150,
  });
  let counterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".progress-text",
      start: "top center",
    },
  });
  // counter animations
  const progressCounter = $(".counter .count span");

  counterTimeline.from(progressCounter, {
    textContent: 0,
    duration: 4,
    snap: { textContent: 1 },
    // stagger: 1,
  });

  // scroll to
  $(".header-Nav li a").each(function (e) {
    const target = $(this).attr("href");
    const targetEl = $(target);
    const targetRect = targetEl.offset();

    $(this).on("click", function (e) {
      menu($(".menuIcon"));
      var setOffset = -120;

      e.preventDefault();
      gsap.to(scrollbar, {
        scrollTo: targetRect.top + setOffset,
        duration: 2.5,
        ease: "power4.inOut",
        onCompleteParams: [targetRect.top],
      });

      $(".aiana-menu li a").removeClass("active");
      $(this).addClass("active");
    });
  });

  scrollbar.addListener((status) => {
    const offset = status.offset;

    if (offset.y >= 500) {
      $("nav").addClass("sticky");
      $(".sticky").css("top", offset.y + "px");
      $(".backToTop").css({ opacity: "1", transform: "translateY(0px)" });
      setTimeout(() => {
        $("nav").removeClass("transitionNav");
      }, 1000);
    } else {
      $("nav").css("top", 0 + "px");
      $("nav").removeClass("sticky");
      $(".backToTop").css({ opacity: "0", transform: "translateY(100%)" });
      $("nav").addClass("transitionNav");
    }
    $(".mobNavInner").css("top", offset.y + "px");
    $(".popUpmain").css("top", offset.y + "px");
  });

  $(".backToTop").on("click", function (e) {
    const target = $("#top");
    const targetEl = $(target);
    const targetRect = targetEl.offset();
    e.preventDefault();
    gsap.to(scrollbar, {
      scrollTo: targetRect.top,
      duration: 2.5,
      ease: "power4.inOut",
      onCompleteParams: [targetRect.top],
    });
  });

  $(".hamMenu").on("click", function () {
    $(this).children(".hamContent").toggleClass("revealHam");
  });

  $(".barsa-button3").mousemove(function (event) {
    var mouseX = event.pageX - $(this).offset().left;
    var mouseY = event.pageY - $(this).offset().top;

    var buttonWidth = $(this).outerWidth();
    var buttonHeight = $(this).outerHeight();

    $(this).css({
      top: mouseY - buttonHeight / 2 + "px",
      left: mouseX - buttonWidth / 2 + "px",
    });

    console.log("Mouse X: " + mouseX + ", Mouse Y: " + mouseY);
  });

  $(".barsa-button3").mouseleave(function () {
    $(this).css({ top: 0 + "px", left: 0 + "px" });
  });

  new CircleType(document.getElementById("circle"));

  var team = new Swiper(".teamSlider", {
    slidesPerView: 3,
    spaceBetween: 24,
    navigation: {
      nextEl: ".team-next",
      prevEl: ".team-prev",
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
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

  var testimonials = new Swiper(".testimonialsSlider", {
    slidesPerView: 4,
    spaceBetween: 24,
    navigation: {
      nextEl: ".team-next",
      prevEl: ".team-prev",
    },
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".testimonial-pagination",
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

  $("#barsaFaq").on("show.bs.collapse", function (e) {
    $(".accordion-item").removeClass("active");
    $(e.target).closest(".accordion-item").addClass("active");
  });

  $("#barsaFaq").on("hide.bs.collapse", function (e) {
    $(e.target).closest(".accordion-item").removeClass("active");
  });

  $(".addP").on("click", function () {
    var totalProject = $(".projectSingle").length;

    if (totalProject == 8) {
      $("#error").css("display", "block");
      $("#error").text("Limit Reached");

      setTimeout(function () {
        $("#error").css("display", "none");
      }, 1000);
    } else {
      const newElement = `
      <div class="col mt-5">
        <div class="projectSingle">
          <img
            class="ProjectIcon"
            src="assets/images/projects/${totalProject + 1}.png"
            alt="ProjectIcon"
          />
        </div>
      </div>
    `;

      var appendHere = $(".appendProject");

      appendHere.append(newElement);
    }
  });

  $(".startplay").on("click", function () {
    const getParent = $(this).closest(".video-block");
    const getVideo = getParent.find("iframe");
    getVideo.css("display", "block");
    getParent.find(".close").css("display", "block");
    var symbol = getVideo[0].src.indexOf("?") > -1 ? "&" : "?";

    // Check if autoplay parameter already exists
    if (getVideo[0].src.indexOf("autoplay") === -1) {
      getVideo[0].src += symbol + "autoplay=1";
    } else {
      getVideo[0].src = getVideo[0].src.replace(/autoplay=0/, "autoplay=1");
    }
  });

  $(".close").on("click", function () {
    const getParent = $(this).closest(".video-block");
    const getVideo = getParent.find("iframe");
    getVideo.css("display", "none");

    var symbol = getVideo[0].src.indexOf("?") > -1 ? "&" : "?";

    // Check if autoplay parameter already exists
    if (getVideo[0].src.indexOf("autoplay") === -1) {
      getVideo[0].src += symbol + "autoplay=0";
    } else {
      getVideo[0].src = getVideo[0].src.replace(/autoplay=1/, "autoplay=0");
    }

    $(this).css("display", "none");
  });

  $("#sub").on("click", function () {
    // form submission
    var dataString = $(".form1").serialize();

    $(this).html("Wait..");

    // send form to send.php
    $.ajax({
      type: "POST",
      url: "assets/dist/form handling/send.php",
      data: dataString,
      processData: false,
      contentType: false,
      success: function (data, status) {
        $(this).html("Success!");
      },
      error: function (data, status) {
        $(this).html("failed!");
      },
    });
  });
});
