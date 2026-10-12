export function initClock() {
  const ruler = document.querySelector('.ruler');
  for (let n = 100; n <= 1400; n += 100) {
    const s = document.createElement('span');
    s.textContent = n;
    ruler.append(s);
  }
  function updateClock() {
    document.querySelector('#clock').textContent = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Africa/Lagos',
    }).format(new Date());
  }
  updateClock();
  setInterval(updateClock, 1000);
}
