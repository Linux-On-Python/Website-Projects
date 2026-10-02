// ================================
// PAGE LOADER
// ================================

window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 1500);
});

// ================================
// HAMBURGER MENU
// ================================

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
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
}

// ================================
// DRAWING MODAL, ZOOM & PAN
// ================================

let currentScale = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

function openModal(imageSrc) {
    const modal = document.getElementById('drawingModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = imageSrc;
        
        // Reset zoom and pan position every time a new image opens
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        updateImageTransform(modalImg);
    }
}

function closeModal() {
    const modal = document.getElementById('drawingModal');
    if (modal) {
        modal.style.display = "none";
    }
}

// Helper function to apply both zoom and drag positions together
function updateImageTransform(imgElement) {
    if (!imgElement) return;
    imgElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    
    // Change cursor style depending on zoom level to hint that it's draggable
    if (currentScale > 1) {
        imgElement.style.cursor = "grab";
    } else {
        imgElement.style.cursor = "zoom-in";
    }
}

// Add scroll-to-zoom and click-and-drag functionality
document.addEventListener("DOMContentLoaded", () => {
    const modalImg = document.getElementById('modalImage');
    
    if (modalImg) {
        // 1. Scroll Wheel Zoom
        modalImg.addEventListener('wheel', function(event) {
            event.preventDefault();
            
            if (event.deltaY < 0) {
                currentScale += 0.2; // Zoom in
            } else {
                currentScale -= 0.2; // Zoom out
            }
            
            // Limit zoom boundaries (1x to 5x)
            if (currentScale < 1) {
                currentScale = 1;
                translateX = 0; // Reset position when fully zoomed out
                translateY = 0;
            }
            if (currentScale > 5) {
                currentScale = 5;
            }
            
            updateImageTransform(modalImg);
        }, { passive: false });

        // 2. Click and Drag (Pan) Setup
        modalImg.addEventListener('mousedown', function(event) {
            if (currentScale > 1) { // Only allow dragging if zoomed in
                isDragging = true;
                modalImg.style.cursor = "grabbing";
                startX = event.clientX - translateX;
                startY = event.clientY - translateY;
                event.preventDefault();
            }
        });

        window.addEventListener('mousemove', function(event) {
            if (!isDragging) return;
            
            translateX = event.clientX - startX;
            translateY = event.clientY - startY;
            
            updateImageTransform(modalImg);
        });

        window.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                updateImageTransform(modalImg);
            }
        });
    }
});
