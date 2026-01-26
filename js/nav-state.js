(function () {
  const nav = {
    home: document.querySelector('[data-nav="home"]'),
    path: document.querySelector('[data-nav="path"]'),
    project: document.querySelector('[data-nav="project"]'),
    timer: document.querySelector('[data-nav="timer"]')
  };

  const pathName = window.location.pathname;

  function disable(el) {
    if (!el) return;
    el.classList.add('disabled');
    el.classList.remove('active');
    el.setAttribute('aria-disabled', 'true');
    el.removeAttribute('href');
    el.onclick = null;
  }

  function enable(el, handler = null) {
    if (!el) return;
    el.classList.remove('disabled');
    el.removeAttribute('aria-disabled');
    if (handler) el.onclick = handler;
  }

  function activate(el) {
    if (!el) return;
    el.classList.add('active');
  }

  function resetAll() {
    Object.values(nav).forEach(el => {
      if (!el) return;
      el.classList.remove('active', 'disabled');
      el.removeAttribute('aria-disabled');
      el.onclick = null;
    });
  }

  /* ========= 宇宙判定（只看資料夾） ========= */

  const isHome =
    pathName === '/' ||
    pathName.endsWith('/index.html');

  const isPathway = pathName.startsWith('/Projects/');
  const isProject = pathName.startsWith('/DTM/');
  const isTimer = pathName.startsWith('/Timer/');

  const isThirdLayer =
    pathName.match(/\/\d{4}_.*\.html$/);

  resetAll();

  /* ===== 首頁 ===== */
  if (isHome) {
    activate(nav.home);
    disable(nav.home);

    disable(nav.path);
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* ===== 我的路徑 ===== */
  if (isPathway) {
    activate(nav.path);

    if (isThirdLayer) {
      enable(nav.path, () => history.back());
    } else {
      disable(nav.path);
    }

    enable(nav.home);
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* ===== 專案計畫 ===== */
  if (isProject) {
    activate(nav.project);

    if (isThirdLayer) {
      enable(nav.project, () => history.back());
    } else {
      disable(nav.project);
    }

    enable(nav.home);
    disable(nav.path);
    enable(nav.timer);
    return;
  }

  /* ===== 計時器 ===== */
  if (isTimer) {
    activate(nav.timer);
    disable(nav.timer);

    enable(nav.home);
    disable(nav.path);
    enable(nav.project);
  }
})();
