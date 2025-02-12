document.addEventListener('DOMContentLoaded', () => {
    // Banner Slideshow
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDotsContainer = document.querySelector('.banner-dots');
    const prevBannerButton = document.querySelector('.banner-navigation .prev-slide');
    const nextBannerButton = document.querySelector('.banner-navigation .next-slide');
    let currentBannerSlide = 0;
    let bannerInterval;

    // Create banner dots
    bannerSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('banner-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToBannerSlide(index));
        bannerDotsContainer.appendChild(dot);
    });

    const bannerDots = document.querySelectorAll('.banner-dot');

    function updateBannerSlide() {
        bannerSlides.forEach(slide => slide.classList.remove('active'));
        bannerDots.forEach(dot => dot.classList.remove('active'));
        
        bannerSlides[currentBannerSlide].classList.add('active');
        bannerDots[currentBannerSlide].classList.add('active');

        // Animate content
        const content = bannerSlides[currentBannerSlide].querySelector('.banner-content');
        gsap.fromTo(content.children, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2
        });
    }

    function nextBannerSlide() {
        currentBannerSlide = (currentBannerSlide + 1) % bannerSlides.length;
        updateBannerSlide();
    }

    function prevBannerSlide() {
        currentBannerSlide = (currentBannerSlide - 1 + bannerSlides.length) % bannerSlides.length;
        updateBannerSlide();
    }

    function goToBannerSlide(index) {
        currentBannerSlide = index;
        updateBannerSlide();
        resetBannerInterval();
    }

    function resetBannerInterval() {
        clearInterval(bannerInterval);
        bannerInterval = setInterval(nextBannerSlide, 5000);
    }

    // Banner navigation event listeners
    prevBannerButton.addEventListener('click', () => {
        prevBannerSlide();
        resetBannerInterval();
    });

    nextBannerButton.addEventListener('click', () => {
        nextBannerSlide();
        resetBannerInterval();
    });

    // Start banner slideshow
    resetBannerInterval();

    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productItems = document.querySelectorAll('.product-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Filter products
            productItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const modal = document.getElementById('product-modal');
    const modalContent = modal.querySelector('.modal-content');
    const closeModal = modal.querySelector('.close-modal');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productItem = button.closest('.product-item');
            const productImage = productItem.querySelector('.product-image img').src;
            const productTitle = productItem.querySelector('.product-details h3').textContent;
            const productDescription = productItem.querySelector('.product-details p').textContent;
            const productPrice = productItem.querySelector('.product-price').textContent;

            // Populate modal content
            modalContent.innerHTML = `
                <span class="close-modal">&times;</span>
                <div class="modal-product">
                    <div class="modal-product-image">
                        <img src="${productImage}" alt="${productTitle}">
                    </div>
                    <div class="modal-product-details">
                        <h2>${productTitle}</h2>
                        <p>${productDescription}</p>
                        <div class="modal-product-price">${productPrice}</div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 10);
        });
    });

    // Close modal functionality
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modalContent.style.transform = 'translateY(20px)';
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.nav-search input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        productItems.forEach(item => {
            const title = item.querySelector('.product-details h3').textContent.toLowerCase();
            const description = item.querySelector('.product-details p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });

    // Product filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter products
            const category = button.dataset.category;
            products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    gsap.to(product, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        display: 'block'
                    });
                } else {
                    gsap.to(product, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        display: 'none'
                    });
                }
            });
        });
    });

    // Quick view functionality
    const productData = {
        'Continuous Inkjet Printer': {
            features: [
                'High-speed continuous printing',
                'Multiple line coding capability',
                'Advanced ink system',
                'Touch screen interface',
                'IP55 rating for harsh environments'
            ]
        },
        'Handheld Inkjet Printer': {
            features: [
                'Portable and lightweight design',
                'Built-in rechargeable battery',
                'Multiple font options',
                'Easy maintenance',
                'Suitable for various surfaces'
            ]
        },
        'Thermal Inkjet Printers': {
            features: [
                'High-resolution printing',
                'Clean and maintenance-free',
                'Multiple printhead options',
                'User-friendly interface',
                'Cost-effective solution'
            ]
        },
        'Laser Marking Machine': {
            features: [
                'Permanent marking solution',
                'High precision and quality',
                'No consumables required',
                'Low operating costs',
                'Suitable for various materials'
            ]
        },
        'Industrial Inkjet Printer': {
            features: [
                'Robust industrial design',
                'High-speed production capability',
                'Advanced diagnostic system',
                'Multiple ink options',
                'Network connectivity'
            ]
        },
        'Printer Cartridge': {
            features: [
                'High-quality ink formulation',
                'Long shelf life',
                'Quick-change design',
                'Multiple color options',
                'Eco-friendly packaging'
            ]
        }
    };

    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = button.closest('.product-item');
            const productImage = productItem.querySelector('img').src;
            const productTitle = productItem.querySelector('h3').textContent;
            const productDesc = productItem.querySelector('p').textContent;
            
            // Update modal content
            modal.querySelector('.modal-image img').src = productImage;
            modal.querySelector('.modal-info h2').textContent = productTitle;
            modal.querySelector('.modal-info .description').textContent = productDesc;
            
            // Update features
            const featuresList = modal.querySelector('.features ul');
            featuresList.innerHTML = '';
            if (productData[productTitle]) {
                productData[productTitle].features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
            }

            // Show modal with animation
            modal.style.display = 'block';
            gsap.from('.modal-content', {
                y: -50,
                opacity: 0,
                duration: 0.3
            });
        });
    });

    closeModal.addEventListener('click', () => {
        gsap.to('.modal-content', {
            y: -50,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal.click();
        }
    });

    // Add to quote functionality
    const quoteButtons = document.querySelectorAll('.add-to-quote');
    quoteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.closest('.product-item').querySelector('h3').textContent;
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = `${productName} added to quote request`;
            document.body.appendChild(notification);
            
            gsap.to(notification, {
                opacity: 1,
                y: -20,
                duration: 0.3
            });
            
            setTimeout(() => {
                gsap.to(notification, {
                    opacity: 0,
                    y: 0,
                    duration: 0.3,
                    onComplete: () => notification.remove()
                });
            }, 3000);
        });
    });

    // Page load animations
    gsap.from('.products-hero h1', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.products-hero p', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.filter-btn', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.product-item', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.6,
        ease: 'power3.out'
    });
});
