(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const header = document.querySelector('[data-header]');
  const menuLabel = document.querySelector('[data-menu-label]');

  const closeMenu = ({ returnFocus = false } = {}) => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    if (menuLabel) menuLabel.textContent = 'Menü öffnen';
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (returnFocus) menuToggle.focus();
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    if (menuLabel) menuLabel.textContent = isOpen ? 'Menü öffnen' : 'Menü schließen';
    nav?.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);

    if (!isOpen) nav?.querySelector('a')?.focus();
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
      closeMenu({ returnFocus: true });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) closeMenu();
  });

  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  }, { passive: true });

  const posterHero = document.querySelector('[data-poster-hero]');
  if (!posterHero) return;
  posterHero.classList.add('is-enhanced');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const precisePointer = window.matchMedia('(pointer: fine)');
  const heroObjects = [...posterHero.querySelectorAll('[data-poster-object]')];
  const titleGroups = [...posterHero.querySelectorAll('.poster-title__group')];
  let pointerFrame = 0;
  let scrollFrame = 0;

  titleGroups.forEach((group) => {
    [...group.children].forEach((word) => {
      const characters = [...word.textContent];
      word.textContent = '';
      word.setAttribute('aria-hidden', 'true');

      characters.forEach((character) => {
        const letter = document.createElement('span');
        letter.className = 'poster-letter';
        letter.dataset.posterLetter = '';
        letter.textContent = character;
        word.append(letter);
      });
    });
  });

  posterHero.addEventListener('click', (event) => {
    const letter = event.target.closest('[data-poster-letter]');
    if (!letter || letter.dataset.letterBusy === 'true') return;

    letter.dataset.letterBusy = 'true';
    letter.style.setProperty('--letter-spin', `${(Math.random() * 18 - 9).toFixed(2)}deg`);
    letter.classList.remove('is-returning');
    letter.classList.add('is-away');

    const returnDelay = 3000 + Math.random() * 1000;
    window.setTimeout(() => {
      letter.classList.remove('is-away');
      letter.classList.add('is-returning');

      window.setTimeout(() => {
        letter.classList.remove('is-returning');
        delete letter.dataset.letterBusy;
      }, reducedMotion.matches ? 50 : 650);
    }, returnDelay);
  });

  const resetPointer = () => {
    [...titleGroups, ...heroObjects].forEach((element) => {
      element.style.setProperty('--element-x', '0px');
      element.style.setProperty('--element-y', '0px');
    });
  };

  const updatePointer = (event) => {
    if (reducedMotion.matches || !precisePointer.matches) return;
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const bounds = posterHero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - .5) * 10;
      const y = ((event.clientY - bounds.top) / bounds.height - .5) * 8;
      [...titleGroups, ...heroObjects].forEach((element) => {
        const depth = Number(element.dataset.depth || 1);
        element.style.setProperty('--element-x', `${(x * depth).toFixed(2)}px`);
        element.style.setProperty('--element-y', `${(y * depth).toFixed(2)}px`);
      });
      pointerFrame = 0;
    });
  };

  const updateScrollExit = () => {
    if (scrollFrame || reducedMotion.matches) return;
    scrollFrame = requestAnimationFrame(() => {
      const bounds = posterHero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height)));
      posterHero.style.setProperty('--title-scroll-y', `${(-progress * 24).toFixed(2)}px`);
      posterHero.style.setProperty('--title-opacity', String(1 - progress * .18));
      posterHero.style.setProperty('--objects-opacity', String(1 - progress * .28));
      posterHero.style.setProperty('--stripe-scale', String(1 - progress * .08));
      heroObjects.forEach((object) => {
        const exitY = Number(getComputedStyle(object).getPropertyValue('--exit-y').replace('px', '') || 25);
        object.style.setProperty('--object-scroll-y', `${(progress * exitY).toFixed(2)}px`);
      });
      scrollFrame = 0;
    });
  };

  posterHero.addEventListener('pointermove', updatePointer, { passive: true });
  posterHero.addEventListener('pointerleave', resetPointer);
  window.addEventListener('scroll', updateScrollExit, { passive: true });

  const entranceDirections = [
    { x: 0, y: -12 },
    { x: -42, y: 22 },
    { x: 38, y: 18 },
    { x: -28, y: 25 },
    { x: 72, y: -18 },
    { x: -64, y: 20 },
    { x: 36, y: 40 },
    { x: 0, y: 18 },
  ];

  if (!reducedMotion.matches) {
    posterHero.querySelectorAll('[data-hero-reveal]').forEach((element, index) => {
      if (typeof element.animate !== 'function') return;
      const direction = entranceDirections[index] || { x: 0, y: 18 };
      element.animate([
        { opacity: 0, transform: `translate3d(${direction.x}px, ${direction.y}px, 0)` },
        { opacity: 1, transform: 'translate3d(0, 0, 0)', offset: .82 },
        { opacity: 1, transform: 'translate3d(0, 0, 0)' },
      ], {
        duration: 620 + Math.min(index, 5) * 45,
        delay: 70 + index * 75,
        easing: 'cubic-bezier(.18,.82,.24,1)',
      });
    });
  }

  const activeInertia = new WeakMap();

  const stopInertia = (object) => {
    const frame = activeInertia.get(object);
    if (frame) cancelAnimationFrame(frame);
    activeInertia.delete(object);
  };

  const enableDrag = (object) => {
    let drag = null;

    const setOffset = (x, y) => {
      object.dataset.dragX = String(x);
      object.dataset.dragY = String(y);
      object.style.setProperty('--drag-x', `${x}px`);
      object.style.setProperty('--drag-y', `${y}px`);
    };

    const release = (event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      object.classList.remove('is-dragging');
      try { object.releasePointerCapture(event.pointerId); } catch (_) {}

      let x = Number(object.dataset.dragX || 0);
      let y = Number(object.dataset.dragY || 0);
      let velocityX = drag.velocityX;
      let velocityY = drag.velocityY;
      const limits = drag.limits;
      drag = null;

      const coast = () => {
        velocityX *= .86;
        velocityY *= .86;
        let nextX = x + velocityX * 7;
        let nextY = y + velocityY * 7;

        if (nextX < limits.minX || nextX > limits.maxX) velocityX *= -.2;
        if (nextY < limits.minY || nextY > limits.maxY) velocityY *= -.2;
        x = Math.min(limits.maxX, Math.max(limits.minX, nextX));
        y = Math.min(limits.maxY, Math.max(limits.minY, nextY));
        setOffset(x, y);

        if (Math.abs(velocityX) + Math.abs(velocityY) > .08) {
          activeInertia.set(object, requestAnimationFrame(coast));
        } else {
          activeInertia.delete(object);
        }
      };

      if (!reducedMotion.matches) activeInertia.set(object, requestAnimationFrame(coast));
    };

    object.addEventListener('pointerdown', (event) => {
      if (!precisePointer.matches || reducedMotion.matches || event.button !== 0) return;
      event.preventDefault();
      stopInertia(object);
      const heroBounds = posterHero.getBoundingClientRect();
      const objectBounds = object.getBoundingClientRect();
      const currentX = Number(object.dataset.dragX || 0);
      const currentY = Number(object.dataset.dragY || 0);
      const originLeft = objectBounds.left - currentX;
      const originTop = objectBounds.top - currentY;
      const safeEdge = 12;

      drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        currentX,
        currentY,
        lastX: event.clientX,
        lastY: event.clientY,
        lastTime: performance.now(),
        velocityX: 0,
        velocityY: 0,
        limits: {
          minX: heroBounds.left + safeEdge - originLeft,
          maxX: heroBounds.right - safeEdge - objectBounds.width - originLeft,
          minY: heroBounds.top + 88 - originTop,
          maxY: heroBounds.bottom - 70 - objectBounds.height - originTop,
        },
      };

      object.classList.add('is-dragging');
      object.setPointerCapture(event.pointerId);
    });

    object.addEventListener('pointermove', (event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const now = performance.now();
      const elapsed = Math.max(1, now - drag.lastTime);
      const nextX = Math.min(drag.limits.maxX, Math.max(drag.limits.minX, drag.currentX + event.clientX - drag.startX));
      const nextY = Math.min(drag.limits.maxY, Math.max(drag.limits.minY, drag.currentY + event.clientY - drag.startY));
      drag.velocityX = drag.velocityX * .55 + ((event.clientX - drag.lastX) / elapsed) * .45;
      drag.velocityY = drag.velocityY * .55 + ((event.clientY - drag.lastY) / elapsed) * .45;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.lastTime = now;
      setOffset(nextX, nextY);
    });

    object.addEventListener('pointerup', release);
    object.addEventListener('pointercancel', release);
  };

  heroObjects.forEach(enableDrag);
  reducedMotion.addEventListener?.('change', (event) => {
    if (event.matches) {
      resetPointer();
      posterHero.style.setProperty('--title-scroll-y', '0px');
      posterHero.style.setProperty('--title-opacity', '1');
      posterHero.style.setProperty('--objects-opacity', '1');
      posterHero.style.setProperty('--stripe-scale', '1');
      heroObjects.forEach((object) => object.style.setProperty('--object-scroll-y', '0px'));
      heroObjects.forEach(stopInertia);
    }
  });
})();
