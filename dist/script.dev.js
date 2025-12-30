"use strict";

// Initialize variables
var currentStep = 1;
var totalSteps = 6;
var userName = "My Love"; // Initialize particles.js

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 40,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#f06292"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.6,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 6,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#f8bbd0",
      "opacity": 0.4,
      "width": 1.5
    },
    "move": {
      "enable": true,
      "speed": 1.5,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 160,
        "line_linked": {
          "opacity": 1
        }
      },
      "push": {
        "particles_nb": 6
      }
    }
  },
  "retina_detect": true
}); // Initialize GSAP animations

document.addEventListener('DOMContentLoaded', function () {
  showStep(currentStep);
  createPetals(); // Animate the heart message

  var heartMessage = document.getElementById('heartMessage');
  document.getElementById('interactiveHeart').addEventListener('click', function () {
    setTimeout(function () {
      heartMessage.classList.add('show');
    }, 500);
  }); // Set countdown (example: next 24 hours)

  setCountdown();
}); // Function to show current step

function showStep(step) {
  // Hide all steps
  document.querySelectorAll('.step').forEach(function (el) {
    el.classList.remove('active');
  }); // Show current step

  var currentStepEl = document.getElementById("step".concat(step));
  currentStepEl.classList.add('active'); // Update progress bar

  var progressPercentage = (step - 1) / (totalSteps - 1) * 100;
  gsap.to("#progressBar", {
    width: "".concat(progressPercentage, "%"),
    duration: 1,
    ease: "power2.out"
  }); // Special animations for each step

  switch (step) {
    case 1:
      // Animate envelope
      gsap.from("#envelope", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
      });
      break;

    case 2:
      // Animate input
      gsap.from(".name-input", {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });
      break;

    case 3:
      // Animate heart
      gsap.from("#interactiveHeart", {
        scale: 0.5,
        rotation: 180,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      });
      document.getElementById('heartName').textContent = userName;
      break;

    case 4:
      // Type out message
      typeMessage(); // Animate photo frame

      gsap.from(".photo-frame", {
        y: 50,
        rotation: -10,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
      });
      break;

    case 5:
      // Animate polaroids
      gsap.from(".polaroid", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)"
      });
      break;

    case 6:
      // Create fireworks
      createFireworks(); // Animate final heart

      gsap.from(".heart", {
        scale: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      });
      break;
  }
} // Function to go to next step


function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep); // Open envelope if on step 1

    if (currentStep === 2) {
      document.getElementById('envelope').classList.add('open');
    }
  }
} // Function to save name


function saveName() {
  var nameInput = document.getElementById('nameInput').value.trim();

  if (nameInput) {
    userName = nameInput;
    document.getElementById('displayName').textContent = userName;
    document.getElementById('finalName').textContent = userName;
    document.getElementById('heartName').textContent = userName;
    nextStep(); // Animate success

    gsap.to(".name-input", {
      backgroundColor: "#e8f5e9",
      borderColor: "#81c784",
      duration: 0.5,
      yoyo: true,
      repeat: 1
    });
  } else {
    // Animate error
    gsap.to(".name-input", {
      backgroundColor: "#ffebee",
      borderColor: "#e53935",
      duration: 0.5,
      yoyo: true,
      repeat: 1
    });
    alert("Please enter your beautiful name to continue");
  }
} // Function to create floating hearts


function createHearts() {
  var container = document.getElementById('floatingHearts');
  var colors = ['#ff4081', '#f06292', '#f8bbd0', '#d81b60', '#ff80ab'];

  var _loop = function _loop(i) {
    var heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤';
    heart.style.left = "".concat(Math.random() * 100, "%");
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.animationDuration = "".concat(3 + Math.random() * 3, "s");
    heart.style.fontSize = "".concat(20 + Math.random() * 25, "px");
    heart.style.top = "".concat(60 + Math.random() * 30, "%");
    container.appendChild(heart); // Remove heart after animation completes

    setTimeout(function () {
      heart.remove();
    }, 4000);
  };

  for (var i = 0; i < 25; i++) {
    _loop(i);
  } // Animate heart click


  gsap.to("#interactiveHeart", {
    scale: 1.3,
    duration: 0.3,
    yoyo: true,
    repeat: 1
  });
} // Function to create falling petals


function createPetals() {
  var container = document.getElementById('petalsContainer');
  var petalColors = ['#ffcdd2', '#f8bbd0', '#fce4ec', '#f48fb1'];

  var _loop2 = function _loop2(i) {
    var petal = document.createElement('div');
    petal.classList.add('petal'); // Random petal shape

    var petalType = Math.floor(Math.random() * 3);
    var petalShape = void 0;

    switch (petalType) {
      case 0:
        petalShape = "M50,0 C60,15 60,30 50,45 C40,30 40,15 50,0";
        break;

      case 1:
        petalShape = "M50,0 C70,20 70,40 50,50 C30,40 30,20 50,0";
        break;

      case 2:
        petalShape = "M50,0 C55,10 55,25 50,35 C45,25 45,10 50,0";
        break;
    }

    petal.style.width = "".concat(10 + Math.random() * 20, "px");
    petal.style.height = "".concat(10 + Math.random() * 20, "px");
    petal.style.left = "".concat(Math.random() * 100, "%");
    petal.style.top = "-20px";
    petal.style.fill = petalColors[Math.floor(Math.random() * petalColors.length)];
    petal.style.opacity = 0.7 + Math.random() * 0.3; // Create SVG for petal

    petal.innerHTML = "\n            <svg viewBox=\"0 0 100 50\" width=\"100%\" height=\"100%\">\n                <path d=\"".concat(petalShape, "\" fill=\"").concat(petalColors[Math.floor(Math.random() * petalColors.length)], "\" />\n            </svg>\n        ");
    container.appendChild(petal); // Animate petal falling

    var duration = 10 + Math.random() * 20;
    var delay = Math.random() * 15;
    var sway = 50 + Math.random() * 100;
    gsap.to(petal, {
      y: window.innerHeight + 50,
      x: "+=".concat(sway),
      rotation: 360,
      duration: duration,
      delay: delay,
      ease: "none",
      onComplete: function onComplete() {
        // Reset petal to top
        petal.style.top = "-20px";
        petal.style.left = "".concat(Math.random() * 100, "%"); // Repeat animation

        gsap.to(petal, {
          y: window.innerHeight + 50,
          x: "+=".concat(sway),
          rotation: 360,
          duration: duration,
          ease: "none",
          onComplete: function onComplete() {
            petal.remove();
          }
        });
      }
    });
  };

  for (var i = 0; i < 15; i++) {
    _loop2(i);
  }
} // Function to type out message


function typeMessage() {
  var messages = ["Dear ".concat(userName, ","), "Happy New Year meri jaan ❤️✨", "New year aaya hai, but meri life ka sabse beautiful part tum hi ho 💕", "Har din apke saath ek new beginning jaisa lagta hai ", "Iss saal bhi agle saal bhi aur hamesha  I choose YOU jan.", "Stay with me, love me, aur meri duniya ban ke rehna.💖", "i love u soooooooooooo much janu 😘😘😘"];
  var typingText = document.getElementById('typingText');
  var messageIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typingSpeed = 100;

  function type() {
    var currentMessage = messages[messageIndex];

    if (isDeleting) {
      typingText.innerHTML = currentMessage.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.innerHTML = currentMessage.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentMessage.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at end of message
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      messageIndex = (messageIndex + 1) % messages.length;
      typingSpeed = 500; // Pause before next message
    }

    setTimeout(type, typingSpeed);
  } // Start typing after a short delay


  setTimeout(function () {
    document.getElementById('typedMessage').classList.add('show');
    type();
  }, 500);
} // Function to create fireworks


function createFireworks() {
  // Create initial fireworks
  for (var i = 0; i < 8; i++) {
    setTimeout(function () {
      createFirework();
    }, i * 800);
  } // Continue with occasional fireworks


  setInterval(function () {
    if (Math.random() > 0.7) {
      createFirework();
    }
  }, 2000);
}

function createFirework() {
  var colors = ['#ff4081', '#f06292', '#f8bbd0', '#d81b60', '#ff80ab', '#ffcdd2']; // Create firework center

  var firework = document.createElement('div');
  firework.classList.add('firework');
  firework.style.color = colors[Math.floor(Math.random() * colors.length)];
  firework.style.setProperty('--x', "".concat(Math.random() * window.innerWidth, "px"));
  firework.style.setProperty('--y', "".concat(Math.random() * window.innerHeight * 0.8, "px"));
  firework.style.setProperty('--x-end', "".concat((Math.random() - 0.5) * 20, "px"));
  firework.style.setProperty('--y-end', "".concat((Math.random() - 0.5) * 20, "px"));
  document.body.appendChild(firework); // Create particles

  setTimeout(function () {
    var _loop3 = function _loop3(i) {
      var particle = document.createElement('div');
      particle.classList.add('firework-particle');
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = firework.style.getPropertyValue('--x');
      particle.style.top = firework.style.getPropertyValue('--y');
      particle.style.setProperty('--tx', "".concat(Math.cos(i * 0.2) * 100, "px"));
      particle.style.setProperty('--ty', "".concat(Math.sin(i * 0.2) * 100, "px"));
      document.body.appendChild(particle); // Remove after animation

      setTimeout(function () {
        particle.remove();
      }, 1000);
    };

    for (var i = 0; i < 30; i++) {
      _loop3(i);
    }

    firework.remove();
  }, 1000);
} // Function to set countdown


function setCountdown() {
  // Set target date (next 24 hours from now)
  var targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1);

  function updateCountdown() {
    var now = new Date();
    var diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('countdown').innerHTML = "<span>Happy Birthday!</span>";
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    var seconds = Math.floor(diff % (1000 * 60) / 1000);
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
} // Function to share on social media


function shareOnSocial(platform) {
  var url = '';
  var text = "Check out this beautiful birthday wish for ".concat(userName, "! ").concat(window.location.href);

  switch (platform) {
    case 'facebook':
      url = "https://www.facebook.com/sharer/sharer.php?u=".concat(encodeURIComponent(window.location.href));
      break;

    case 'twitter':
      url = "https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(text));
      break;

    case 'whatsapp':
      url = "https://wa.me/?text=".concat(encodeURIComponent(text));
      break;
  }

  window.open(url, '_blank', 'width=600,height=400'); // Animate share button

  gsap.to(".social-icon:nth-child(".concat(['facebook', 'twitter', 'whatsapp'].indexOf(platform) + 1, ")"), {
    scale: 1.3,
    duration: 0.3,
    yoyo: true,
    repeat: 1
  });
} // No predefined-name handler required for single predefined input
//# sourceMappingURL=script.dev.js.map
