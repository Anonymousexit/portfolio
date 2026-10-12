export function addSelectionFrames() {
  document.querySelectorAll('.action, .contact-label, .experiment-surface').forEach((element) => {
    const frame = document.createElement('span');
    frame.className = 'selection-frame';
    frame.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 4; i++) frame.append(document.createElement('i'));
    element.append(frame);
  });
}
