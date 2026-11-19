// Light / dark toggle. Remembers the choice; otherwise follows the system setting.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var current = function () {
    var t = root.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return media && media.matches ? 'dark' : 'light';
  };
  var render = function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    var text = 'Switch to ' + next + ' mode';
    btn.setAttribute('aria-label', text);
    btn.setAttribute('title', text);
    btn.querySelector('.theme-label').textContent = next === 'dark' ? 'Dark' : 'Light';
  };
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('jb-theme', next); } catch (e) {}
    render();
  });
  if (media && media.addEventListener) media.addEventListener('change', render);
  new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  render();
})();

// Show the profile photo only if assets/img/profile.jpg exists; otherwise keep the JB monogram.
(function () {
  var img = document.querySelector('.portrait img');
  if (!img) return;
  var show = function () { img.hidden = false; };
  if (img.complete && img.naturalWidth) show();
  img.addEventListener('load', show);
  img.addEventListener('error', function () { img.remove(); });
})();

// Copy buttons in the contact section.
document.querySelectorAll('.copy').forEach(function (b) {
  b.addEventListener('click', function () {
    var label = b.textContent;
    var done = function (msg) { b.textContent = msg; setTimeout(function () { b.textContent = label; }, 1800); };
    try {
      navigator.clipboard.writeText(b.dataset.copy).then(function () { done('Copied'); }, function () { done('Select the text to copy'); });
    } catch (e) { done('Select the text to copy'); }
  });
});
