document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('subscribe-modal');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const closeModal = document.querySelector('.close-modal');
    
    subscribeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form submission
    const subscribeForm = document.getElementById('subscribe-form');
    const modalSubscribeForm = document.getElementById('modal-subscribe-form');
    
    subscribeForm.addEventListener('submit', handleSubscribe);
    modalSubscribeForm.addEventListener('submit', handleSubscribe);
    
    function handleSubscribe(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // In a real application, you would send this to your backend
        console.log('Subscription requested for:', email);
        
        // Show success message
        const form = e.target;
        form.innerHTML = '<p class="success-message">Thanks for subscribing! Check your email for confirmation.</p>';
        
        // If this was the modal form, close the modal after a delay
        if (form.id === 'modal-subscribe-form') {
            setTimeout(() => {
                modal.style.display = 'none';
            }, 2000);
        }
    }
    
    // Estimated reading time calculation for blog posts
    if (document.querySelector('.blog-content')) {
        const article = document.querySelector('.blog-content');
        const text = article.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed
        
        document.querySelector('.read-time').textContent = `${readingTime} min read`;
    }
});
