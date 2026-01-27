/**
 * Inventory Menu System
 * Handles the video-game style inventory menu and popup windows
 */

class InventoryMenu {
    constructor() {
        this.isOpen = false;
        this.menuItems = [
            { id: 'about', label: 'About', isLink: true, url: '/articles/about' },
            { id: 'events', label: 'Events', hasContent: true },
            { id: 'social', label: 'Social', hasContent: true },
            { id: 'shopping', label: 'Shop', isExternal: true, url: 'https://www.kawadesign.us/' },
            { id: 'contact', label: 'Contact', hasContent: true },
            { id: 'radio', label: 'Radio', hasContent: true },
            { id: 'sword', label: 'Sword', isDroppable: true, image: '/images/sprites/sword1.gif' },
            { id: 'guestbook', label: 'Logbook', hasContent: true }
        ];

        this.popupContent = {
            events: {
                title: 'Kawa Events',
                content: `
                    <iframe src="https://calendar.google.com/calendar/embed?height=450&wkst=1&ctz=America%2FDenver&showCalendars=0&showPrint=0&mode=AGENDA&title=Kawa%20Events&src=YWYzNmU2NDdjZGZkYzUyYjkzOTRiMDRjNDFiOTRhMWQ0YTc4MzU1YWMxNmFhOGEzYmUxNjM3YzcyYzg4YzI1NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%233f51b5" style="border-width:0" width="600" height="480" frameborder="0" scrolling="no"></iframe>
                `,
                popupClass: 'calendar-popup'
            },
            social: {
                title: 'Social Media',
                content: `
                    <p>Follow Kawa Designs for updates, behind-the-scenes content, and adventure inspiration.</p>
                    <div class="social-links">
                        <a href="https://www.instagram.com/kawa.designs" class="social-link" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.youtube.com/channel/UC30b-MFWLis865vGaivkwrQ" class="social-link" target="_blank" rel="noopener noreferrer">YouTube</a>
                        <a href="https://www.facebook.com/p/Kawa-Designs-61550865273634/" class="social-link" target="_blank" rel="noopener noreferrer">Facebook</a>
                    </div>
                `
            },
            contact: {
                title: 'Contact',
                content: `
                    <p>Get in touch with Kawa Designs:</p>
                    <p><strong>Email:</strong> <a href="mailto:kawa.outdoor.designs@gmail.com" class="contact-email-link">kawa.outdoor.designs@gmail.com</a></p>
                    <p><strong>Location:</strong> Salt Lake City, Utah</p>
                `
            },
            radio: {
                title: 'Kawa Radio',
                content: `
                    <div id="audio-player"></div>
                `
            },
            guestbook: {
                title: 'Logbook',
                content: `
                    <p style="margin-bottom: 16px; color: var(--green-forest);">Leave your mark on the trail! Sign the logbook and say hello.</p>
                    <div id="cusdis_thread"
                        data-host="https://cusdis.com"
                        data-app-id="e5efd1f2-ea0a-4da1-b432-df5979658893"
                        data-page-id="guestbook"
                        data-page-url="${window.location.origin}/guestbook"
                        data-page-title="Trail Log"
                    ></div>
                `
            }
        };

        this.init();
    }

    init() {
        this.menuButton = document.getElementById('menu-button');
        this.menuButtonContainer = document.querySelector('.sidebar-menu-button');
        this.overlay = document.getElementById('inventory-overlay');
        this.inventoryWindow = document.getElementById('inventory-window');
        this.popupContainer = document.getElementById('popup-container');
        this.closeButton = document.querySelector('.inventory-close');
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (!this.menuButton || !this.overlay) return;

        this.bindEvents();

        // Only enable dragging on non-touch devices
        if (!this.isTouchDevice) {
            this.makeInventoryDraggable();
        }
    }

    bindEvents() {
        // Toggle menu on button container click
        this.menuButtonContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Close button
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.close());
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.hasOpenPopups()) {
                    this.closeAllPopups();
                } else if (this.isOpen) {
                    this.close();
                }
            }
        });

        // Close when clicking overlay background
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Inventory item clicks
        const slots = document.querySelectorAll('.inventory-slot:not(.empty)');
        slots.forEach(slot => {
            slot.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = slot.dataset.item;
                this.handleItemClick(itemId);
            });
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;

        // Position inventory window below the backpack menu button
        this.positionInventoryWindow();

        this.overlay.classList.remove('hidden');
        this.overlay.setAttribute('aria-hidden', 'false');
        this.menuButton.setAttribute('aria-expanded', 'true');
        this.menuButtonContainer.classList.add('menu-active');

        // Focus management for accessibility
        setTimeout(() => {
            const firstSlot = this.inventoryWindow.querySelector('.inventory-slot:not(.empty)');
            if (firstSlot) firstSlot.focus();
        }, 350);
    }

    positionInventoryWindow() {
        // On touch devices, let CSS handle centering
        if (this.isTouchDevice) {
            return;
        }

        const buttonRect = this.menuButtonContainer.getBoundingClientRect();

        // Use offsetWidth/Height which give layout size regardless of transform
        const windowWidth = this.inventoryWindow.offsetWidth;
        const windowHeight = this.inventoryWindow.offsetHeight;

        // Center the window on the page
        const left = (window.innerWidth - windowWidth) / 2;
        const top = (window.innerHeight - windowHeight) / 2;

        this.inventoryWindow.style.left = `${left}px`;
        this.inventoryWindow.style.top = `${top}px`;

        // Calculate transform origin to point at the center of the backpack button
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        const originX = buttonCenterX - left;
        const originY = buttonCenterY - top;

        this.inventoryWindow.style.transformOrigin = `${originX}px ${originY}px`;
    }

    makeInventoryDraggable() {
        const frame = this.inventoryWindow.querySelector('.inventory-frame');
        if (!frame) return;

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const onMouseDown = (e) => {
            // Don't drag if clicking on buttons or inventory slots
            if (e.target.closest('button, .inventory-slot')) return;

            isDragging = true;
            this.inventoryWindow.classList.add('dragging');

            const rect = this.inventoryWindow.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Keep window within viewport bounds
            const width = this.inventoryWindow.offsetWidth;
            const height = this.inventoryWindow.offsetHeight;
            newX = Math.max(0, Math.min(newX, window.innerWidth - width));
            newY = Math.max(0, Math.min(newY, window.innerHeight - height));

            this.inventoryWindow.style.left = `${newX}px`;
            this.inventoryWindow.style.top = `${newY}px`;
        };

        const onMouseUp = () => {
            isDragging = false;
            this.inventoryWindow.classList.remove('dragging');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        frame.addEventListener('mousedown', onMouseDown);
    }

    close() {
        this.isOpen = false;
        this.overlay.classList.add('hidden');
        this.overlay.setAttribute('aria-hidden', 'true');
        this.menuButton.setAttribute('aria-expanded', 'false');
        this.menuButtonContainer.classList.remove('menu-active');
    }

    handleItemClick(itemId) {
        const item = this.menuItems.find(i => i.id === itemId);
        if (!item) return;

        // Internal link (about)
        if (item.isLink && item.url) {
            this.close();
            window.location.href = item.url;
            return;
        }

        // External link (shop)
        if (item.isExternal && item.url) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
            return;
        }

        // Droppable item (sword) - skip physics since we're not migrating it
        if (item.isDroppable) {
            return;
        }

        // Open popup for items with content
        if (item.hasContent) {
            this.close();
            setTimeout(() => {
                this.openPopup(itemId);
            }, 200);
        }
    }

    openPopup(itemId) {
        const content = this.popupContent[itemId];
        if (!content) return;

        // Create popup element
        const popup = document.createElement('div');
        popup.className = 'popup-window' + (content.popupClass ? ' ' + content.popupClass : '');
        popup.dataset.popup = itemId;
        popup.innerHTML = `
            <div class="popup-frame">
                <button class="popup-close" aria-label="Close">ESC</button>
                <div class="popup-content">
                    <h2>${content.title}</h2>
                    ${content.content}
                </div>
            </div>
        `;

        this.popupContainer.appendChild(popup);

        // Center the popup initially (on non-touch devices; CSS handles touch)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (!this.isTouchDevice) {
                    // Use offsetWidth/Height for accurate dimensions after layout
                    const popupWidth = popup.offsetWidth;
                    const popupHeight = popup.offsetHeight;
                    popup.style.left = `${(window.innerWidth - popupWidth) / 2}px`;
                    popup.style.top = `${(window.innerHeight - popupHeight) / 2}px`;
                }
                popup.classList.add('open');
            });
        });

        // Bind close button
        const closeBtn = popup.querySelector('.popup-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closePopup(itemId);
        });

        // Setup draggable functionality (only on non-touch devices)
        if (!this.isTouchDevice) {
            this.makeDraggable(popup);
        }

        // Initialize audio player if this is the radio popup
        if (itemId === 'radio' && window.audioPlayer) {
            setTimeout(() => {
                window.audioPlayer.init();
            }, 100);
        }

        // Initialize Cusdis if this is the guestbook popup
        if (itemId === 'guestbook') {
            setTimeout(() => {
                // Load Cusdis script if not already loaded
                if (!document.querySelector('script[src*="cusdis"]')) {
                    const script = document.createElement('script');
                    script.src = 'https://cusdis.com/js/cusdis.es.js';
                    script.async = true;
                    script.defer = true;
                    document.body.appendChild(script);
                } else if (window.CUSDIS) {
                    // If already loaded, refresh the widget
                    window.CUSDIS.renderTo(popup.querySelector('#cusdis_thread'));
                }
            }, 100);
        }
    }

    makeDraggable(popup) {
        const frame = popup.querySelector('.popup-frame');
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const onMouseDown = (e) => {
            // Don't drag if clicking on buttons, inputs, or links
            if (e.target.closest('button, input, a, .popup-content')) return;

            isDragging = true;
            popup.classList.add('dragging');

            const rect = popup.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Keep popup within viewport bounds
            const rect = popup.getBoundingClientRect();
            newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width));
            newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height));

            popup.style.left = `${newX}px`;
            popup.style.top = `${newY}px`;
        };

        const onMouseUp = () => {
            isDragging = false;
            popup.classList.remove('dragging');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        frame.addEventListener('mousedown', onMouseDown);
    }

    closePopup(itemId) {
        const popup = document.querySelector(`[data-popup="${itemId}"]`);
        if (!popup) return;

        // Reset audio player when closing radio popup
        if (itemId === 'radio' && window.audioPlayer) {
            window.audioPlayer.reset();
        }

        popup.classList.remove('open');
        popup.classList.add('closing');

        setTimeout(() => {
            popup.remove();
        }, 300);
    }

    closeAllPopups() {
        const popups = document.querySelectorAll('.popup-window');
        popups.forEach(popup => {
            const itemId = popup.dataset.popup;
            this.closePopup(itemId);
        });
    }

    hasOpenPopups() {
        return document.querySelectorAll('.popup-window').length > 0;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.inventoryMenu = new InventoryMenu();
});
