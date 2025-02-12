document.addEventListener('DOMContentLoaded', () => {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    
    document.body.appendChild(cursor);
    cursor.appendChild(cursorDot);
    cursor.appendChild(cursorRing);

    // Initial cursor position
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Smooth cursor following
    const updateCursor = () => {
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;
        
        cursorX += diffX * 0.1;
        cursorY += diffY * 0.1;
        
        gsap.set(cursorDot, {
            x: mouseX,
            y: mouseY
        });
        
        gsap.set(cursorRing, {
            x: cursorX,
            y: cursorY
        });
        
        requestAnimationFrame(updateCursor);
    };

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Start animation loop
    updateCursor();

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .excellence-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Show/hide cursor based on window focus
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });

    // Hide cursor when window loses focus
    window.addEventListener('blur', () => {
        cursor.style.display = 'none';
    });

    window.addEventListener('focus', () => {
        cursor.style.display = 'block';
    });
});
