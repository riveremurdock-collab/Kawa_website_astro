// Photo book behaviour (format: photobook posts). Markup comes from
// PhotoBookLayout.astro + the Book* blocks; looks from photobook.css.
//
// Page states, one at a time:
//   normal — everything showing
//   zoomed — one small photo enlarged in the middle, everything else faded
//   bare   — only the background photo, with a small Back button
// Reading mode (text clicked → photo blurred/darkened) sits on top of normal.

type State = 'normal' | 'zoomed' | 'bare';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export function initPhotoBook(root: HTMLElement) {
  const viewport = root.querySelector<HTMLElement>('[data-pb-viewport]')!;
  const track = root.querySelector<HTMLElement>('[data-pb-track]')!;
  const zoomLayer = root.querySelector<HTMLElement>('[data-pb-zoom-layer]')!;
  const prevBtn = root.querySelector<HTMLButtonElement>('[data-pb-prev]')!;
  const nextBtn = root.querySelector<HTMLButtonElement>('[data-pb-next]')!;
  const restoreBtn = root.querySelector<HTMLButtonElement>('[data-pb-restore]')!;
  const currentEl = root.querySelector<HTMLElement>('[data-pb-current]')!;
  const pages = Array.from(track.querySelectorAll<HTMLElement>(':scope > [data-pb-page]'));
  root.querySelector<HTMLElement>('[data-pb-total]')!.textContent = String(pages.length);

  let current = 0;
  let state: State = 'normal';
  let zoomed: { source: HTMLElement; clone: HTMLElement } | null = null;
  let suppressClick = false;

  // ---------- Page changes ----------

  function go(index: number) {
    index = Math.max(0, Math.min(pages.length - 1, index));
    resetState(true);
    pages[current].classList.remove('is-reading');
    current = index;

    track.style.transform = `translateX(${-100 * index}%)`;
    pages.forEach((page, i) => {
      const active = i === index;
      page.inert = !active;
      page.setAttribute('aria-hidden', String(!active));
    });
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === pages.length - 1;
    currentEl.textContent = String(index + 1);
    setBarTone();

    // Shareable link to the page. replaceState, so the browser's Back button
    // leaves the post instead of stepping back through every page.
    const url = index === 0 ? location.pathname + location.search : `#${index + 1}`;
    history.replaceState(null, '', url);

    loadAround(index);
    drawRoute(pages[index]);
    playVideos(index);
  }

  // Photos are lazy; start loading the current page and its neighbours.
  function loadAround(index: number) {
    for (const i of [index, index + 1, index - 1]) {
      pages[i]?.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach(img => {
        img.loading = 'eager';
      });
    }
  }

  // Route line draws itself the first time its page is shown, never again.
  function drawRoute(page: HTMLElement) {
    const route = page.querySelector<HTMLElement>('[data-pb-route]:not(.is-drawn)');
    if (!route) return;
    // Two frames so the undrawn state is painted first and the transition runs.
    requestAnimationFrame(() => requestAnimationFrame(() => route.classList.add('is-drawn')));
  }

  // ---------- Zoom ----------

  function zoom(figure: HTMLElement) {
    const source = figure.querySelector<HTMLImageElement | HTMLVideoElement>('img, video');
    if (!source) return;

    const box = viewport.getBoundingClientRect();
    const from = source.getBoundingClientRect();
    // A photo's real pixel size is on its width/height attributes (Astro
    // writes the source file's size there); a video reports its own.
    const naturalW = Number(source.getAttribute('width')) || (source as HTMLVideoElement).videoWidth || from.width;
    const naturalH = Number(source.getAttribute('height')) || (source as HTMLVideoElement).videoHeight || from.height;

    // Fill the page height, but never beyond the file's real pixel size,
    // and never wider than the page. The top of the page sits under the
    // floating site header, so the space starts below it.
    const pad = 24;
    const headerClearance = parseFloat(getComputedStyle(root).getPropertyValue('--pb-top')) || pad;
    const availH = box.height - headerClearance - pad;
    let h = Math.min(availH, naturalH);
    let w = (h * naturalW) / naturalH;
    if (w > box.width - pad * 2) {
      w = box.width - pad * 2;
      h = (w * naturalH) / naturalW;
    }
    const left = (box.width - w) / 2;
    const top = headerClearance + (availH - h) / 2;

    const clone = source.cloneNode(true) as HTMLImageElement | HTMLVideoElement;
    if (clone instanceof HTMLImageElement && source instanceof HTMLImageElement) {
      // Show the already-loaded small version straight away, then swap in a
      // sharper one sized for the enlarged view once it has downloaded.
      clone.removeAttribute('srcset');
      clone.removeAttribute('loading');
      clone.src = source.currentSrc || source.src;
      if (source.srcset) {
        const sharp = new Image();
        sharp.sizes = `${Math.ceil(w)}px`;
        sharp.srcset = source.srcset;
        sharp.decode().then(() => {
          if (clone.isConnected) clone.src = sharp.currentSrc;
        }).catch(() => {});
      }
    } else if (clone instanceof HTMLVideoElement) {
      clone.muted = true;
      clone.currentTime = (source as HTMLVideoElement).currentTime;
      clone.play().catch(() => {});
    }
    Object.assign(clone.style, {
      left: `${left}px`,
      top: `${top}px`,
      width: `${w}px`,
      height: `${h}px`,
    });

    zoomLayer.append(clone);
    zoomLayer.classList.add('is-active');
    source.style.visibility = 'hidden';
    pages[current].classList.add('is-zoomed');
    root.classList.add('is-zoomed');
    state = 'zoomed';
    zoomed = { source, clone };

    animateBetween(clone, from, box, { left, top, w, h }, 'in');
  }

  function unzoom(instant = false) {
    if (!zoomed) return;
    const { source, clone } = zoomed;
    zoomed = null;
    state = 'normal';
    pages[current].classList.remove('is-zoomed');
    root.classList.remove('is-zoomed');
    zoomLayer.classList.remove('is-active');

    const finish = () => {
      clone.remove();
      source.style.visibility = '';
    };
    if (instant) return finish();

    const box = viewport.getBoundingClientRect();
    const to = source.getBoundingClientRect();
    const rect = {
      left: parseFloat(clone.style.left),
      top: parseFloat(clone.style.top),
      w: parseFloat(clone.style.width),
      h: parseFloat(clone.style.height),
    };
    animateBetween(clone, to, box, rect, 'out').then(finish);
  }

  // Animates the clone's box between the small photo's rectangle and its
  // enlarged one. The box itself grows (rather than being scaled), so with
  // object-fit: cover an XL photo's crop opens out instead of stretching.
  function animateBetween(
    el: HTMLElement,
    small: DOMRect,
    box: DOMRect,
    big: { left: number; top: number; w: number; h: number },
    direction: 'in' | 'out',
  ): Promise<unknown> {
    const frames = [
      {
        left: `${small.left - box.left}px`,
        top: `${small.top - box.top}px`,
        width: `${small.width}px`,
        height: `${small.height}px`,
      },
      { left: `${big.left}px`, top: `${big.top}px`, width: `${big.w}px`, height: `${big.h}px` },
    ];
    if (direction === 'out') frames.reverse();
    const anim = el.animate(frames, {
      duration: reducedMotion.matches ? 1 : 500,
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      fill: 'forwards',
    });
    return anim.finished.catch(() => {});
  }

  // ---------- Bare photo ----------
  // A clicked background section grows to fill the page (CSS transitions
  // its box), and everything else fades away.

  let expanded: HTMLElement | null = null;

  function bare(bg: HTMLElement) {
    state = 'bare';
    expanded = bg;
    bg.classList.add('is-expanded');
    // It's about to be page-sized: let the browser fetch a big enough version.
    const img = bg.querySelector('img');
    if (img) img.sizes = '100vw';
    pages[current].classList.add('is-bare');
    root.classList.add('is-bare');
  }

  function unbare() {
    state = 'normal';
    pages[current].classList.remove('is-bare');
    root.classList.remove('is-bare');
    const bg = expanded;
    expanded = null;
    if (!bg) return;
    // Stay on top of the other sections until it has shrunk back.
    bg.classList.replace('is-expanded', 'is-shrinking');
    setTimeout(() => bg.classList.remove('is-shrinking'), reducedMotion.matches ? 0 : 650);
  }

  // The background section under a point, looking through the grid on top.
  function backgroundAt(x: number, y: number): HTMLElement | null {
    const page = pages[current];
    for (const el of document.elementsFromPoint(x, y)) {
      const bg = el.closest<HTMLElement>('[data-pb-bg]');
      if (bg && page.contains(bg)) return bg;
    }
    return null;
  }

  // Only the current page's videos play.
  function playVideos(index: number) {
    pages.forEach((page, i) => {
      page.querySelectorAll('video').forEach(video => {
        if (i === index) video.play().catch(() => {});
        else video.pause();
      });
    });
  }

  function resetState(instant = false) {
    if (state === 'zoomed') unzoom(instant);
    if (state === 'bare') unbare();
  }

  // ---------- Clicks ----------

  root.addEventListener('click', event => {
    if (suppressClick) return;
    const target = event.target as HTMLElement;
    const page = pages[current];

    if (state === 'zoomed') return unzoom();
    if (target.closest('a, button, .pb-end-inner')) return;
    if (state === 'bare') return unbare();
    if (!page.contains(target)) return;

    const media = target.closest<HTMLElement>('[data-pb-media]');
    if (media) {
      page.classList.remove('is-reading');
      return zoom(media);
    }

    if (target.closest('.pb-text')) {
      page.classList.toggle('is-reading');
      return;
    }

    if (page.classList.contains('is-reading')) {
      page.classList.remove('is-reading');
      return;
    }

    const bg = backgroundAt(event.clientX, event.clientY);
    if (bg) bare(bg);
  });

  prevBtn.addEventListener('click', () => go(current - 1));
  nextBtn.addEventListener('click', () => go(current + 1));
  restoreBtn.addEventListener('click', () => unbare());
  root.querySelectorAll<HTMLElement>('[data-pb-goto]').forEach(btn => {
    btn.addEventListener('click', () => go(Number(btn.dataset.pbGoto) - 1));
  });

  // ---------- Keyboard ----------

  document.addEventListener('keydown', event => {
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable]')) return;

    if (event.key === 'ArrowRight') go(current + 1);
    else if (event.key === 'ArrowLeft') go(current - 1);
    else if (event.key === 'Escape') {
      resetState();
      pages[current].classList.remove('is-reading');
    } else if ((event.key === 'Enter' || event.key === ' ') && target.closest('[data-pb-media], .pb-text')) {
      event.preventDefault();
      target.click();
    }
  });

  // ---------- Swipe (touch & pen; mouse users have the buttons/keys) ----------

  let drag: { id: number; x: number; y: number; dx: number; axis: 'x' | 'y' | null } | null = null;

  track.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' || state !== 'normal') return;
    const strip = (event.target as HTMLElement).closest<HTMLElement>('.pb-strip');
    if (strip && strip.scrollWidth > strip.clientWidth + 1) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, axis: null };
  });

  track.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (drag.axis === 'x') track.classList.add('is-dragging');
    }
    if (drag.axis !== 'x') return;
    // Resist past the first and last page.
    const atEdge = (current === 0 && dx > 0) || (current === pages.length - 1 && dx < 0);
    drag.dx = atEdge ? dx / 3 : dx;
    track.style.transform = `translateX(calc(${-100 * current}% + ${drag.dx}px))`;
  });

  const endDrag = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.id) return;
    const { axis, dx } = drag;
    drag = null;
    if (axis !== 'x') return;
    track.classList.remove('is-dragging');
    suppressClick = true;
    setTimeout(() => (suppressClick = false), 50);
    const threshold = viewport.clientWidth * 0.15;
    if (dx < -threshold) go(current + 1);
    else if (dx > threshold) go(current - 1);
    else go(current);
  };
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  // ---------- Text colour per layout ----------
  // Each page knows which text colour suits the photo where the text sits on
  // desktop and on a phone; use the one for the current screen.
  // (Same breakpoint as the phone layout in photobook.css.)

  const phoneLayout = window.matchMedia('(max-width: 768px), (orientation: portrait) and (max-width: 1024px)');

  function applyTones() {
    pages.forEach(page => {
      const tone = phoneLayout.matches ? page.dataset.tonePhone : page.dataset.toneDesktop;
      if (tone) page.dataset.tone = tone;
    });
    setBarTone();
  }

  // The bottom bar sits along the bottom of the photo on every screen, so it
  // always goes by the desktop reading (the photo's bottom-left).
  function setBarTone() {
    const page = pages[current];
    root.dataset.tone = page.dataset.toneDesktop ?? page.dataset.tone;
  }

  phoneLayout.addEventListener('change', applyTones);

  // ---------- Scrollable text ----------
  // Text that doesn't fit its cell scrolls; while there's more below, the
  // bottom edge fades (the has-more class) as a cue.

  const texts = Array.from(root.querySelectorAll<HTMLElement>('.pb-text'));

  function updateTextFade(text: HTMLElement) {
    const more = text.scrollHeight - text.scrollTop - text.clientHeight > 2;
    text.classList.toggle('has-more', more);
  }

  const updateAllTextFades = () => texts.forEach(updateTextFade);
  texts.forEach(text => text.addEventListener('scroll', () => updateTextFade(text), { passive: true }));
  document.fonts?.ready.then(updateAllTextFades);
  window.addEventListener('load', updateAllTextFades);

  window.addEventListener('resize', () => {
    if (state === 'zoomed') unzoom(true);
    updateAllTextFades();
  });

  // ---------- Start ----------

  const pageFromHash = () => Number(location.hash.match(/^#(\d+)$/)?.[1]) || 1;

  // Jump straight to a linked page without sliding past the others.
  function jump(index: number) {
    track.classList.add('is-dragging');
    go(index);
    requestAnimationFrame(() => track.classList.remove('is-dragging'));
  }

  // A link to another page of the same book (e.g. #5) only changes the hash.
  window.addEventListener('hashchange', () => jump(pageFromHash() - 1));
  applyTones();
  jump(pageFromHash() - 1);
  updateAllTextFades();
}
