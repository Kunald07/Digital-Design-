function locoAnimation() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }
  locoAnimation();
  // data scroll data scroll speed -2 to page
  
  function page1Animation() {
    gsap.from("#page1 h1", {
      y: 600,
      duration: 1,
      delay: 0.5,
      stagger: 0.2,
    });
  
    var allText = document.querySelectorAll(".page1-text h1");
    allText.forEach(function (elem) {
      var text = elem.textContent;
      var splittedText = text.split("");
      var clutter = "";
      splittedText.forEach(function (e) {
        clutter += `<span>${e}</span>`;
      });
      elem.innerHTML = clutter;
    });
    gsap.from(".page1-text h1 span", {
      y: 300,
      opacity: 0,
      delay: 0.6,
      duration: 1,
      stagger: 0.1,
    });
  }
  page1Animation();
  function cursorAnimation() {
    var crsr = document.querySelector("#cursor");
    document.addEventListener("mousemove", function (dets) {
      gsap.to(crsr, {
        x: dets.x,
        y: dets.y,
        delay: 0.4,
      });
    });
  
    var allImages = document.querySelectorAll(".image-div");
    var text = "";
    allImages.forEach(function (elem) {
      elem.addEventListener("mouseenter", function () {
        text = elem.getAttribute("data-text");
        gsap.to(crsr, {
          width: "170px",
        });
        gsap.from("#cursor h5", {
          opacity: 0,
          delay: 0.2,
        });
        crsr.innerHTML = `<h5>${text}</h5> <h5>${text}</h5> <h5>${text}</h5>`;
      });
      elem.addEventListener("mouseleave", function () {
        crsr.innerHTML = "<h5></h5>";
        gsap.to(crsr, {
          width: "25px",
        });
      });
    });
  }
  cursorAnimation();
  function svgAnimation(string) {
    var mypath = "M 10 80 Q 500 80 990 80";
    var finalPath = "M 10 80 Q 500 80 990 80";
  
    var string = document.querySelector(string);
  
    string.addEventListener("mousemove", function (dets) {
      mypath = `M 10 80 Q ${dets.x} ${dets.y} 990 80`;
      gsap.to("svg path", {
        attr: { d: mypath },
      });
    });
    string.addEventListener("mouseleave", function () {
      gsap.to("svg path", {
        attr: { d: finalPath },
        ease: "elastic.out(1,0.3)",
        duration: 2,
      });
    });
  }
  svgAnimation("#page2 .string");
  svgAnimation("#page3 .string");
  
  function page4Animation() {
    var ImgContainer = document.querySelector("#imageContainer");
    ImgContainer.addEventListener("mouseenter", function () {
      gsap.to("#moving-image", {
        opacity: 1,
      });
    });
    ImgContainer.addEventListener("mouseleave", function () {
      gsap.to("#moving-image", {
        opacity: 0,
      });
    });
  
    // var movingImageDiv = document.querySelector("#moving-image");
    var moveImg = document.querySelector("#moving-image img");
  
    var allElements = document.querySelectorAll(".imageData");
    allElements.forEach(function (elem) {
      elem.addEventListener("mouseenter", function () {
        let image = elem.getAttribute("data-image");
        gsap.to(moveImg, {
          attr: { src: image },
        });
      });
      ImgContainer.addEventListener("mousemove", function (dets) {
        gsap.to("#moving-image", {
          left: `${dets.x - ImgContainer.getBoundingClientRect().x}`,
          top: `${dets.y - ImgContainer.getBoundingClientRect().y}`,
          duration: 3,
          ease: "power3.out",
        });
      });
    });
  }
  page4Animation();
  
  