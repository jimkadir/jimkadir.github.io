document.getElementById('year').textContent = new Date().getFullYear();


// Load YouTube only when a visitor chooses to play a video.
// Close removes the iframe and stops playback.
document.addEventListener('click', function(event) {
  const trigger = event.target.closest('.video-embed-trigger');
  if (trigger) {
    const id = trigger.dataset.videoId;
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    const card = trigger.closest('.video-card');
    if (!card || card.classList.contains('is-playing')) return;
    const player = document.createElement('div');
    player.className = 'inline-player';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'inline-player-close';
    close.textContent = '✕ Close';
    close.setAttribute('aria-label', 'Close video player');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    player.append(close, iframe);
    trigger.insertAdjacentElement('afterend', player);
    card.classList.add('is-playing');
    close.focus();
    return;
  }
  const close = event.target.closest('.inline-player-close');
  if (close) {
    const card = close.closest('.video-card');
    if (!card) return;
    close.closest('.inline-player').remove();
    card.classList.remove('is-playing');
    card.querySelector('.video-embed-trigger')?.focus();
  }
});
