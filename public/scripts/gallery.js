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

function makeClickable(el, index) {
    el.style.cursor = 'pointer';
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `View image ${index + 1}`);
    el.addEventListener('click', () => window.gallery.openLightbox(index));
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.gallery.openLightbox(index);
        }
    });
}

// Initialize on page load — unifies frontmatter gallery and inline body images
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new ImageGallery();

    const allImages = [];

    // 1. Frontmatter gallery images (defined in article YAML header)
    const galleryContainer = document.querySelector('.article-gallery-container');
    if (galleryContainer) {
        try {
            const frontmatterImages = JSON.parse(galleryContainer.dataset.images || '[]');
            allImages.push(...frontmatterImages);
        } catch (e) {}

        galleryContainer.querySelectorAll('.gallery-item').forEach((item) => {
            const index = parseInt(item.dataset.index, 10) || 0;
            makeClickable(item, index);
        });
    }

    // 2. Inline images within the article body (including PhotoInline components)
    const articleBody = document.querySelector('.article-body');
    if (articleBody) {
        const frontmatterCount = allImages.length;
        articleBody.querySelectorAll('img').forEach((img, bodyIndex) => {
            const globalIndex = frontmatterCount + bodyIndex;
            const figure = img.closest('figure');
            const caption = figure ? figure.querySelector('figcaption')?.textContent : '';

            allImages.push({
                src: img.src,
                alt: img.alt || '',
                caption: caption || ''
            });

            makeClickable(img, globalIndex);
        });
    }

    window.gallery.images = allImages;
});
