// Wait for the page to fully load
window.addEventListener('load', function() {

    // Find the loader element
    const loader = document.querySelector('.page-loader');

    // Wait 1.5 seconds then hide it
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 1500);

});

// HAMBURGER MENU

// Find the hamburger button and nav
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

// When hamburger is clicked
hamburger.addEventListener('click', function() {

    // Toggle active class on hamburger (draws the X)
    hamburger.classList.toggle('active');

    // Toggle open class on nav (show the menu)
    nav.classList.toggle('open');
});

// Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        nav.classList.remove('open');
    });
});