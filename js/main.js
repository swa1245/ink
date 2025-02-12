// Navbar animation on page load
gsap.from('.nav-logo', {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.nav-links ul li', {
    opacity: 0,
    y: -20,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
});

gsap.from('.nav-search', {
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out'
});

// Add active class to current navigation item
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Search functionality
const searchInput = document.querySelector('.nav-search input');
const searchButton = document.querySelector('.nav-search button');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Add search functionality here
        console.log('Searching for:', searchTerm);
    }
});

// Banner animations
gsap.from('.banner-content h1', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out'
});

gsap.from('.banner-content p', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out'
});

gsap.from('.cta-button', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1.1,
    ease: 'power3.out'
});

// Banner Slideshow
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.banner-slide');
    const dotsContainer = document.querySelector('.banner-dots');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('banner-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.banner-dot');

    function updateSlide() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Start automatic slideshow
    resetInterval();
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Featured Products Button Scroll
const scrollContainer = document.querySelector('.featured-products-content');
const leftButton = document.querySelector('.scroll-left');
const rightButton = document.querySelector('.scroll-right');

const scrollAmount = 400; // Amount to scroll per click

function updateScrollButtons() {
    if (scrollContainer) {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        if (leftButton) {
            leftButton.style.display = scrollContainer.scrollLeft <= 0 ? "none" : "flex";
        }
        
        if (rightButton) {
            rightButton.style.display = scrollContainer.scrollLeft >= maxScroll ? "none" : "flex";
        }
    }
}

// Add click event listeners
if (leftButton) {
    leftButton.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
}

if (rightButton) {
    rightButton.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Update button visibility on scroll
if (scrollContainer) {
    scrollContainer.addEventListener('scroll', updateScrollButtons);
    // Initialize button visibility
    updateScrollButtons();
}

// GSAP Animations for product cards
const productCards = gsap.utils.toArray('.product-card');
productCards.forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'top center',
            toggleActions: 'play none none reverse'
        }
    });
});

// Featured Products Animations
const productsContainer = document.querySelector('.products-container');
const products = gsap.utils.toArray('.product-card');

// Section Header Animation
gsap.from('.featured-products .section-header', {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: '.featured-products',
        start: 'top 80%',
        end: 'top 60%',
        toggleActions: 'play none none reverse',
        scrub: 1
    }
});

// Staggered product cards animation
gsap.from('.product-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.featured-products-content',
        start: 'top 80%',
        end: 'top 60%',
        toggleActions: 'play none none reverse',
        scrub: 1
    }
});

// Training Section Animations
gsap.from('.training-section .section-header', {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: '.training-section',
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1
    }
});

const videoCards = gsap.utils.toArray('.video-card');
videoCards.forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 1
        }
    });
});

// Sample Products Animations
gsap.from('.sample-products .section-header', {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: '.sample-products',
        start: 'top 80%',
        end: 'top 60%',
        toggleActions: 'play none none reverse',
        scrub: 1
    }
});

gsap.from('.sample-card', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: {
        each: 0.2,
        from: "start"
    },
    scrollTrigger: {
        trigger: '.sample-grid',
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
        scrub: 1
    }
});

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = modal.querySelector('.modal-image');
    const closeBtn = modal.querySelector('.close-modal');
    const prevBtn = modal.querySelector('.modal-nav.prev');
    const nextBtn = modal.querySelector('.modal-nav.next');
    const sampleCards = document.querySelectorAll('.sample-card');

    let currentImageIndex = 0;
    const images = Array.from(sampleCards).map(card => 
        card.querySelector('img').src
    );

    function openModal(index) {
        currentImageIndex = index;
        modalImg.src = images[currentImageIndex];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImg.src = images[currentImageIndex];
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentImageIndex];
    }

    // Event Listeners
    sampleCards.forEach((card, index) => {
        const viewBtn = card.querySelector('.action-btn');
        viewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(index);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'Escape':
                closeModal();
                break;
        }
    });
});

// Video Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const videoFrame = videoModal.querySelector('.video-frame');
    const closeVideoBtn = videoModal.querySelector('.close-modal');
    const videoCards = document.querySelectorAll('.video-card');

    function openVideoModal(videoUrl) {
        videoFrame.src = videoUrl;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        videoModal.classList.remove('active');
        videoFrame.src = '';
        document.body.style.overflow = '';
    }

    // Event Listeners
    videoCards.forEach(card => {
        const thumbnail = card.querySelector('.video-thumbnail');
        thumbnail.addEventListener('click', () => {
            const videoUrl = card.dataset.video;
            openVideoModal(videoUrl);
        });
    });

    closeVideoBtn.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeVideoModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
});

// Video Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const videoFrame = videoModal.querySelector('.video-frame');
    const closeVideoBtn = videoModal.querySelector('.close-modal');
    const videoCards = document.querySelectorAll('.video-card');

    function openVideoModal(videoUrl) {
        videoFrame.src = videoUrl;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        videoModal.classList.remove('active');
        videoFrame.src = '';
        document.body.style.overflow = '';
    }

    // Event Listeners
    videoCards.forEach(card => {
        const thumbnail = card.querySelector('.video-thumbnail');
        thumbnail.addEventListener('click', () => {
            const videoUrl = card.dataset.video;
            openVideoModal(videoUrl);
        });
    });

    closeVideoBtn.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeVideoModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
});

// Video Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const videoFrame = videoModal.querySelector('.video-frame');
    const closeVideoBtn = videoModal.querySelector('.close-modal');
    const videoCards = document.querySelectorAll('.video-card');

    function openVideoModal(videoUrl) {
        videoFrame.src = videoUrl;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        videoModal.classList.remove('active');
        videoFrame.src = '';
        document.body.style.overflow = '';
    }

    // Event Listeners
    videoCards.forEach(card => {
        const thumbnail = card.querySelector('.video-thumbnail');
        thumbnail.addEventListener('click', () => {
            const videoUrl = card.dataset.video;
            openVideoModal(videoUrl);
        });
    });

    closeVideoBtn.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeVideoModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
});
