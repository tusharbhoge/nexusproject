// JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const slideCount = slides.length;
    let slideIndex = 0;

    // Function to show a specific slide with animation
    function showSlide(index) {
        slider.style.transition = 'none'; // Disable transition effect
        slider.style.transform = `translateX(-${index * 100}%)`;

        // Get h4 elements of the current slide
        const currentSlide = slides[index];
        const h4Elements = currentSlide.querySelectorAll('.slide-content h4');

        // Reset opacity and apply animation to h4 elements
        h4Elements.forEach(h4 => {
            h4.style.opacity = 0;
            animateH4(h4);
        });

        slideIndex = index;
    }

    // Function to animate h4 element
    function animateH4(h4) {
        let distance = -100; // Initial distance, starting from the left
        const animationInterval = setInterval(() => {
            if (distance >= 0) {
                clearInterval(animationInterval);
            } else {
                distance += 1.5; // Adjust this value to control the speed of animation
                h4.style.transform = `translateX(${distance}%)`;
                h4.style.opacity = 1;
            }
        }, 10); // Adjust this value to control the speed of animation
    }

    // Event listeners for prev and next buttons
    prevBtn.addEventListener('click', () => {
        const newIndex = (slideIndex === 0) ? slideCount - 1 : slideIndex - 1;
        showSlide(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = (slideIndex === slideCount - 1) ? 0 : slideIndex + 1;
        showSlide(newIndex);
    });

    // Function to automatically change slides
    function autoSlide() {
        const newIndex = (slideIndex === slideCount - 1) ? 0 : slideIndex + 1;
        showSlide(newIndex);
    }

    // Set interval for automatic slide transition
    setInterval(autoSlide, 8000); // Change slide every 8 seconds

    // Initial slide animation
    showSlide(slideIndex);
});

// ///////////////////////////////toggle btn/////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.querySelector('.toggle-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const toggleIcon = toggleBtn.querySelector('i');

    toggleBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
            toggleIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            dropdownMenu.style.display = 'none';
            toggleIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Error handling (optional):
    if (!toggleBtn || !dropdownMenu || !toggleIcon) {
        console.error('Missing required elements: toggle button, dropdown menu, or icon');
    }
});


window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const parallaxContainer = document.querySelector('.parallax-container');
    parallaxContainer.style.backgroundPositionY = `${scrollTop * 0.3}px`; // Adjust the scroll speed as needed
});
//  google sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbylKq50-J469OwxIxROiuA9KXGrp8Qt14FWtbhgtvNIm8Dy_8lOsI8JtXFqpMZCXo41/exec';

const form = document.forms['submit-to-google-sheet1'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    msg.innerHTML = "Sending...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfully..!!";
            setTimeout(function(){
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => {
            msg.innerHTML = "Error! Please try again.";
            console.error('Error!', error.message);
        });
});

