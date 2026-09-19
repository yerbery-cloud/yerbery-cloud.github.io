(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var menuToggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  var progress = document.getElementById('reading-progress');
  var year = document.getElementById('current-year');

  if (year) year.textContent = new Date().getFullYear();

  var saved = localStorage.getItem('yerbery-theme');
  if (saved) root.setAttribute('data-theme', saved);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('yerbery-theme', next);
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function updateProgress() {
    if (!progress || !document.querySelector('.article-content')) return;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    progress.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Reading room: five visual sub-types, one-click client-side filtering.
  var filter = document.getElementById('reading-filter');
  var readingCards = Array.prototype.slice.call(document.querySelectorAll('[data-reading-type]'));
  if (filter && readingCards.length) {
    filter.addEventListener('click', function (event) {
      var button = event.target.closest('[data-reading-filter]');
      if (!button) return;
      var type = button.getAttribute('data-reading-filter');

      filter.querySelectorAll('[data-reading-filter]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });

      readingCards.forEach(function (card) {
        var show = type === 'all' || card.getAttribute('data-reading-type') === type;
        card.classList.toggle('is-hidden', !show);
      });
    });
  }


  // Research lab: filter logs by note type without leaving the page.
  var researchFilter = document.getElementById('research-filter');
  var researchCards = Array.prototype.slice.call(document.querySelectorAll('[data-research-type]'));
  if (researchFilter && researchCards.length) {
    researchFilter.addEventListener('click', function (event) {
      var button = event.target.closest('[data-research-filter]');
      if (!button) return;
      var type = button.getAttribute('data-research-filter');

      researchFilter.querySelectorAll('[data-research-filter]').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });

      researchCards.forEach(function (card) {
        var show = type === 'all' || card.getAttribute('data-research-type') === type;
        card.classList.toggle('is-hidden', !show);
      });
    });
  }

  // Study / research notes: create a lightweight table of contents from h2/h3 headings.
  var article = document.getElementById('article-content');
  var toc = document.getElementById('study-toc') || document.getElementById('research-toc');
  var tocList = document.getElementById('study-toc-list') || document.getElementById('research-toc-list');
  if (article && toc && tocList) {
    var headings = Array.prototype.slice.call(article.querySelectorAll('h2, h3'));
    if (!headings.length) {
      toc.classList.add('is-empty');
    } else {
      headings.forEach(function (heading, index) {
        if (!heading.id) heading.id = 'section-' + (index + 1);
        var link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        link.setAttribute('data-level', heading.tagName === 'H3' ? '3' : '2');
        tocList.appendChild(link);
      });
    }
  }
})();
