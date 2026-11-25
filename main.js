// Dr Ličina Vet: meni, aktivna sekcija, špil slika u „O nama". Sav tekst je u HTML-u.
(function () {
  // Mobilni meni (otvara se preko sadržaja)
  var burger = document.querySelector('.burger');
  var mnav = document.getElementById('mobilni-meni');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    mnav.hidden = !open;
  }
  burger.addEventListener('click', function () { setMenu(mnav.hidden); });
  mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !mnav.hidden) { setMenu(false); burger.focus(); }
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });

  // Aktivna stavka menija prema poziciji
  var ids = ['usluge', 'tim', 'utisci', 'pitanja', 'kontakt'];
  var navLinks = document.querySelectorAll('[data-nav]');
  var active = null;
  function onScroll() {
    var a = '';
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && el.getBoundingClientRect().top <= 120) a = ids[i];
    }
    if (a === active) return;
    active = a;
    navLinks.forEach(function (l) { l.setAttribute('aria-current', String(l.dataset.nav === a)); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // „O nama": dve slike složene kao špil
  var cards = document.querySelectorAll('.deck__card');
  var dots = document.querySelectorAll('[data-dot]');
  var counter = document.querySelector('.team__count');
  var n = cards.length, top = 0, busy = false;
  function render(outIdx) {
    cards.forEach(function (c, i) {
      var pos = (i - top + n) % n;
      var out = outIdx === i;
      c.style.zIndex = out ? 10 : n - pos;
      c.style.transform = out ? 'translate(-55%, -4%) rotate(-9deg)'
        : pos === 0 ? 'none' : 'translate(var(--off), var(--off)) rotate(3deg)';
      c.setAttribute('aria-hidden', String(pos !== 0));
    });
    dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === top)); });
    counter.textContent = (top + 1) + ' / ' + n;
  }
  function show(i) { if (!busy && i !== top) { top = (i + n) % n; render(); } }
  function next() {
    // gornja slika odleti levo, pa ode na dno špila
    if (busy) return;
    busy = true;
    render(top);
    setTimeout(function () { busy = false; top = (top + 1) % n; render(); }, 300);
  }
  function prev() { show(top - 1); }
  document.querySelector('[data-team="next"]').addEventListener('click', next);
  document.querySelector('[data-team="prev"]').addEventListener('click', prev);
  dots.forEach(function (d) { d.addEventListener('click', function () { show(+d.dataset.dot); }); });

  var deck = document.querySelector('.deck'), tx = null, ty = 0;
  deck.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  deck.addEventListener('touchend', function (e) {
    if (tx === null) return;
    var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
    tx = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next(); else prev();
  });
})();
