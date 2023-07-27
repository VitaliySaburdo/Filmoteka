export function openVideoModal(videoKey) {
  const backdrop = document.createElement('div');
  backdrop.classList.add('modal__backdrop');

  const iframe = document.createElement('iframe');
  iframe.classList.add('modal__trailer');
  iframe.src = `https://www.youtube.com/embed/${videoKey}`;
  iframe.allowFullscreen = true;

  backdrop.appendChild(iframe);

  document.body.appendChild(backdrop);

  setTimeout(() => {
    backdrop.classList.add('active');
  }, 10);

  backdrop.addEventListener('click', () => {
    backdrop.classList.remove('active');
    backdrop.addEventListener('transitionend', () => {
      backdrop.remove();
    });
  });
}
