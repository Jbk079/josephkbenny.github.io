// Runs before the page paints: applies the visitor's saved theme so there's no flash.
(function () {
  try {
    var saved = localStorage.getItem('jb-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) { /* storage unavailable: follow the system setting */ }
})();
