// Cite dropdowns: toggle on click; close on outside-click or Escape.
// Supports multiple dropdowns on the page (one per paper card). Opening one
// closes the others. "Copy as text" writes both text/plain and text/html so
// paste targets that respect rich text (Word, Google Docs, Notes, email) get
// italics on the journal name and bold on the volume number; plain-text
// contexts get the unformatted string.

(function () {
  const dropdowns = Array.from(document.querySelectorAll('.cite-dropdown'));
  if (!dropdowns.length) return;

  function closeAll() {
    dropdowns.forEach((d) => d.classList.remove('is-active'));
  }

  async function copyCitation(text, html) {
    try {
      if (navigator.clipboard && typeof window.ClipboardItem !== 'undefined') {
        const item = new ClipboardItem({
          'text/plain': new Blob([text], { type: 'text/plain' }),
          'text/html': new Blob([html], { type: 'text/html' })
        });
        await navigator.clipboard.write([item]);
        return;
      }
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Older browsers: hidden textarea + execCommand. Loses formatting.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.dropdown-trigger button');
    const copyItem = dropdown.querySelector('[data-cite-text]');
    const copyLabel = copyItem && copyItem.querySelector('.cite-label');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasActive = dropdown.classList.contains('is-active');
        closeAll();
        if (!wasActive) dropdown.classList.add('is-active');
      });
    }

    if (copyItem) {
      copyItem.addEventListener('click', async (e) => {
        e.preventDefault();
        const text = copyItem.dataset.citationText || '';
        const html = copyItem.dataset.citationHtml || text;
        await copyCitation(text, html);
        if (copyLabel) {
          const original = copyLabel.textContent;
          copyLabel.textContent = 'Copied!';
          setTimeout(() => { copyLabel.textContent = original; dropdown.classList.remove('is-active'); }, 1200);
        } else {
          dropdown.classList.remove('is-active');
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!dropdowns.some((d) => d.contains(e.target))) closeAll();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
})();

// Figure lightbox: click any result figure to view it enlarged; click anywhere
// or press Escape to close. No dependencies; the overlay is built on the fly.
(function () {
  const imgs = Array.from(document.querySelectorAll('.result-figure img'));
  if (!imgs.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const big = document.createElement('img');
  const close = document.createElement('button');
  close.className = 'lightbox-close';
  close.setAttribute('aria-label', 'Close enlarged figure');
  close.innerHTML = '&times;';

  overlay.appendChild(big);
  overlay.appendChild(close);
  document.body.appendChild(overlay);

  function openLb(src, alt) {
    big.src = src;
    big.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    big.removeAttribute('src');
  }

  imgs.forEach((img) => {
    img.addEventListener('click', () => openLb(img.currentSrc || img.src, img.alt));
  });

  overlay.addEventListener('click', closeLb);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeLb();
  });
})();
