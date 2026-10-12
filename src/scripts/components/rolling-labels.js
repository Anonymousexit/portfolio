export function addRollingLabels() {
  document.querySelectorAll('.action, .project-link').forEach((button) => {
    // Keep one semantic copy. The second line is visual only.
    [...button.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
      .forEach((node) => {
        const label = document.createElement('span');
        label.className = 'roll-label';
        const line = document.createElement('span');
        line.className = 'roll-line';
        line.textContent = node.textContent.trim();
        const copy = line.cloneNode(true);
        copy.setAttribute('aria-hidden', 'true');
        label.append(line, copy);
        node.replaceWith(label);
      });
  });
}
