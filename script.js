/* Theme toggle. The initial theme is set by an inline script in <head> so the
   page never paints in the wrong one; this only handles clicks afterwards.

   The switch itself is pure CSS: `body` transitions its background and text
   color at the same rate, so the two cross in the middle. */

(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  function label() {
    button.setAttribute(
      'aria-label',
      root.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  var chrome = document.querySelector('meta[name="theme-color"]');

  function apply(dark) {
    if (dark) root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    // The browser chrome follows the page, not the operating system.
    if (chrome) chrome.content = dark ? '#1f1e1d' : '#f0eee6';
    label();
  }

  label();

  button.addEventListener('click', function () {
    var dark = root.dataset.theme !== 'dark';
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    apply(dark);
  });

  // Follow the OS until the visitor makes an explicit choice. Night still wins:
  // the head script works it out and leaves the answer on the root element.
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    try { if (localStorage.getItem('theme')) return; } catch (err) {}
    apply(e.matches || root.dataset.night === '1');
  });
})();
