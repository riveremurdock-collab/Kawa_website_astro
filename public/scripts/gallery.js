/**
 * Lightbox
 *
 * Reads only elements explicitly marked with data-lightbox-group — never
 * scans .article-body/.detail-body/etc. for images. A block that doesn't
 * set data-lightbox-group is excluded by default, not by exception.
 * Ordering within a group comes from DOM order among marked elements only,
 * which is document/render order for the blocks that mark themselves —
 * never inferred from unrelated page content.
 */
class ImageGallery {
    constructor(lightboxEl) {
        this.lightbox = lightboxEl;
        this.imageEl = lightboxEl.querySelector('#lightbox-image');
        this.captionEl = lightboxEl.querySelector('#lightbox-caption');
        this.counterEl = lightboxEl.querySelector('#lightbox-counter');
        this.closeBtn = lightboxEl.querySelector('.lightbox-close');
        this.prevBtn = lightboxEl.querySelector('.lightbox-prev');
        this.nextBtn = lightboxEl.querySelector('.lightbox-next');

        this.images = [];
        this.currentIndex = 0;
        this.isOpen = false;
        this.triggerElement = null;

        this.bindEvents();
    }

    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Click outside the frame closes
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });

        this.lightbox.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
                case 'Tab':
                    this.trapFocus(e);
                    break;
            }
        });

        // Touch swipe support
        let touchStartX = 0;
        this.lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.lightbox.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? this.next() : this.prev();
            }
        }, { passive: true });
    }

    focusableButtons() {
        // prev/next are hidden (display: none) for a single-image group —
        // offsetParent is null for anything not rendered, so this
        // naturally excludes them from the trap in that case.
        return [this.closeBtn, this.prevBtn, this.nextBtn].filter(el => el.offsetParent !== null);
    }

    trapFocus(e) {
        const focusable = this.focusableButtons();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    open(images, index, triggerElement) {
        if (images.length === 0) return;

        this.images = images;
        this.currentIndex = index;
        this.triggerElement = triggerElement;
        this.isOpen = true;

        const multi = images.length > 1;
        this.prevBtn.style.display = multi ? '' : 'none';
        this.nextBtn.style.display = multi ? '' : 'none';
        this.counterEl.style.display = multi ? '' : 'none';

        this.render();

        this.lightbox.classList.add('is-active');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            this.lightbox.classList.add('open');
            this.closeBtn.focus();
        });
    }

    close() {
        if (!this.isOpen) return;
        this.isOpen = false;

        this.lightbox.classList.remove('open');
        document.body.style.overflow = '';

        setTimeout(() => {
            this.lightbox.classList.remove('is-active');
        }, 300);

        if (this.triggerElement) {
            this.triggerElement.focus();
            this.triggerElement = null;
        }
    }

    render() {
        const image = this.images[this.currentIndex];
        this.imageEl.src = image.src;
        this.imageEl.alt = image.alt || '';
        this.captionEl.textContent = image.caption || '';
        this.counterEl.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }

    renderWithFade() {
        this.imageEl.style.opacity = '0';
        setTimeout(() => {
            this.render();
            this.imageEl.style.opacity = '1';
        }, 150);
    }

    prev() {
        if (this.images.length <= 1) return;
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.renderWithFade();
    }

    next() {
        if (this.images.length <= 1) return;
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.renderWithFade();
    }
}

function makeClickable(el, openHandler) {
    el.style.cursor = 'pointer';
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.addEventListener('click', openHandler);
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openHandler();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const lightboxEl = document.getElementById('lightbox');
    if (!lightboxEl) return;

    const gallery = new ImageGallery(lightboxEl);

    // Group marked elements by their declared lightbox group, in DOM order.
    const marked = Array.from(document.querySelectorAll('[data-lightbox-group]'));
    const groups = new Map();

    marked.forEach((img) => {
        const group = img.dataset.lightboxGroup;
        if (!groups.has(group)) groups.set(group, []);
        groups.get(group).push(img);
    });

    groups.forEach((elements) => {
        const images = elements.map((el) => {
            const figure = el.closest('figure');
            const caption = figure ? figure.querySelector('figcaption')?.textContent : '';
            return { src: el.src, alt: el.alt || '', caption: caption || '' };
        });

        elements.forEach((el, index) => {
            el.setAttribute('aria-label', `View image ${index + 1} of ${images.length}`);
            makeClickable(el, () => gallery.open(images, index, el));
        });
    });
});
