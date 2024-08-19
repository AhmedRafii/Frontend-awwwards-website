var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnimation() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInout,
  })

    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInout,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInout,
    });
}
function circleSquizer() {
  var xScale = 1;
  var yScale = 1;

  var xPrev = 0;
  var yPrev = 0;

  window.addEventListener("mousemove", function (e) {
    clearTimeout(timeout);
    xScale = gsap.utils.clamp(0.8, 1.2, e.clientX - xPrev);
    yScale = gsap.utils.clamp(0.8, 1.2, e.clientY - yPrev);

    xPrev = e.clientX;
    yPrev = e.clientY;

    mouseTracker(xScale, yScale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function mouseTracker(xScale, yScale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScale}, ${yScale})`;
  });
}

// document.querySelectorAll(".element").forEach(function (element) {
//   var rotate = 0;
//   var diff = 0;

//   element.addEventListener("mouseleave", function (details) {
//     gsap.to(element.querySelector("img"), {
//       opacity: 0,
//       duration: .5,
//       ease: Power3,
//     });
//   });

//   element.addEventListener("mousemove", function (details) {
//     var difference = details.clientY - element.getBoundingClientRect().top;
//     diff = details.clientX - rotate;
//     rotate = details.clientX;
//     gsap.to(element.querySelector("img"), {
//       opacity: 1,
//       ease: Power3,
//       top: difference,
//       left: details.clientX,
//       rotate: gsap.utils.clamp(-20, 20, diff * 0.5),
//     });
//   });
// });


document.querySelectorAll(".element").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });

mouseTracker();
firstPageAnimation();
circleSquizer();




function updateClock() {
    // Get current date and time in UTC
    const now = new Date();

    // Convert to EST (UTC-5)
    const estOffset = -5; // EST is UTC-5
    const estTime = new Date(now.getTime() + estOffset * 60 * 60 * 1000);

    // Extract hours, minutes, and seconds
    let hours = estTime.getUTCHours();
    const minutes = estTime.getUTCMinutes();
    const seconds = estTime.getUTCSeconds();

    // Convert to 12-hour format and determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Pad minutes and seconds with leading zeros
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;

    // Construct time string
    const timeString = `${hours}:${minutesStr}:${secondsStr} ${ampm} EST`;

    // Display the clock
    document.getElementById('clock').innerText = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock on page load
updateClock();


