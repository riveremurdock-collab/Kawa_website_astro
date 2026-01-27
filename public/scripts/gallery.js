/**
 * Image Gallery System
 * Handles horizontal gallery scrolling and fullscreen lightbox
 */

class ImageGallery {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.lightboxOpen = false;
        this.keyHandler = null;
    }

    init(images) {
        this.images = images || [];
        if (this.images.length === 0) return;

        this.bindGalleryEvents();
    }

    initInlineImages(images, imgElements) {
        this.images = images || [];
        if (this.images.length === 0) return;

        imgElements.forEach((img) => {
            const index = parseInt(img.dataset.galleryIndex, 10) || 0;

            // Make image clickable
            img.style.cursor = 'pointer';

            img.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(index);
            });

            // Keyboard accessibility
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', `View image ${index + 1}`);

            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openLightbox(index);
                }
            });
        });
    }

    bindGalleryEvents() {
        // Find all gallery items in the article content
        const items = document.querySelectorAll('.article-gallery-container .gallery-item');
        if (!items || items.length === 0) return;

        items.forEach((item) => {
            const index = parseInt(item.dataset.index, 10) || 0;

            item.addEventListener('click', () => {
                this.openLightbox(index);
            });

            // Keyboard accessibility
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View image ${index + 1}`);

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openLightbox(index);
                }
            });
        });
    }

    openLightbox(index) {
        if (this.images.length === 0) return;

        this.currentIndex = index;
        this.lightboxOpen = true;

        // Create lightbox element
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-label', 'Image lightbox');

        const image = this.images[index];
        lightbox.innerHTML = `
            <div class="lightbox-frame">
                <button class="lightbox-close" aria-label="Close lightbox">ESC</button>
                ${this.images.length > 1 ? `
                    <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
                    <button class="lightbox-next" aria-label="Next image">&#8250;</button>
                ` : ''}
                <div class="lightbox-image-container">
                    <img src="${image.src}" alt="${image.alt || ''}" id="lightbox-image">
                </div>
                <div class="lightbox-caption" id="lightbox-caption">${image.caption || ''}</div>
                ${this.images.length > 1 ? `
                    <div class="lightbox-counter" id="lightbox-counter">${index + 1} / ${this.images.length}</div>
                ` : ''}
            </div>
        `;

        document.body.appendChild(lightbox);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Bind events
        this.bindLightboxEvents(lightbox);

        // Animate in
        requestAnimationFrame(() => {
            lightbox.classList.add('open');
        });
    }

    bindLightboxEvents(lightbox) {
        // Close button
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => this.closeLightbox());

        // Nav buttons
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevImage());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextImage());
        }

        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        this.keyHandler = (e) => {
            if (!this.lightboxOpen) return;

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        };

        document.addEventListener('keydown', this.keyHandler);

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextImage();
            } else {
                this.prevImage();
            }
        }
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        this.lightboxOpen = false;

        // Remove keyboard handler
        if (this.keyHandler) {
            document.removeEventListener('keydown', this.keyHandler);
            this.keyHandler = null;
        }

        // Animate out
        lightbox.classList.remove('open');

        // Restore body scroll
        document.body.style.overflow = '';

        setTimeout(() => {
            lightbox.remove();
        }, 300);
    }

    updateLightbox() {
        const img = document.getElementById('lightbox-image');
        const caption = document.getElementById('lightbox-caption');
        const counter = document.getElementById('lightbox-counter');

        if (!img) return;

        const image = this.images[this.currentIndex];

        // Fade transition
        img.style.opacity = '0';

        setTimeout(() => {
            img.src = image.src;
            img.alt = image.alt || '';

            if (caption) {
                caption.textContent = image.caption || '';
            }
            if (counter) {
                counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
            }

            img.style.opacity = '1';
        }, 150);
    }

    prevImage() {
        if (this.images.length <= 1) return;
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightbox();
    }

    nextImage() {
        if (this.images.length <= 1) return;
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightbox();
    }
}

// Initialize global instance and setup on page load
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new ImageGallery();

    // Find all images in the article body
    const articleBody = document.querySelector('.article-body');
    if (articleBody) {
        const imgElements = articleBody.querySelectorAll('img');
        const images = [];

        imgElements.forEach((img, index) => {
            // Build image data from the img element
            const figure = img.closest('figure');
            const caption = figure ? figure.querySelector('figcaption')?.textContent : '';

            images.push({
                src: img.src,
                alt: img.alt || '',
                caption: caption || ''
            });

            // Store index on the image for click handling
            img.dataset.galleryIndex = index;
        });

        if (images.length > 0) {
            window.gallery.initInlineImages(images, imgElements);
        }
    }
});
