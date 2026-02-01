// nav-state.js
(function () {
  const nav = {
    home: document.querySelector('[data-nav="home"]'),
    path: document.querySelector('[data-nav="path"]'),
    project: document.querySelector('[data-nav="project"]'),
    timer: document.querySelector('[data-nav="timer"]')
  };

  const pathName = window.location.pathname;

  /* ---------- 工具 ---------- */

  function resetAll() {
    Object.values(nav).forEach(el => {
      if (!el) return;
      el.classList.remove('active', 'disabled');
      el.removeAttribute('aria-disabled');
      el.onclick = null;
    });
  }

  function activate(el) {
    el && el.classList.add('active');
  }

  function disable(el) {
    if (!el) return;
    el.classList.add('disabled');
    el.setAttribute('aria-disabled', 'true');
    el.onclick = e => e.preventDefault();
  }

  function enable(el, handler = null) {
    if (!el) return;
    el.classList.remove('disabled');
    el.removeAttribute('aria-disabled');
    if (handler) el.onclick = handler;
  }

  /* ---------- 路徑判斷 ---------- */

  const isHome =
    pathName === '/' ||
    pathName === '/index.html';

  const isPathway = pathName.startsWith('/Projects/');
  const isProject = pathName.startsWith('/DTM/');
  const isTimer = pathName.startsWith('/Timer/');

  const isPathwayDetail = isPathway && /\/\d{4}_/.test(pathName);
  const isProjectDetail = isProject && /\/\d{4}_/.test(pathName);

  /* ---------- 主流程 ---------- */

  resetAll();

  /* 首頁 */
  if (isHome) {
    activate(nav.home);
    disable(nav.home);

    disable(nav.path);
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* Pathways（我的路徑） */
  if (isPathway) {
    activate(nav.path);

    if (isPathwayDetail) {
      enable(nav.path, () => history.back());
    } else {
      disable(nav.path); // 第二層：高亮 + 不可用
    }

    enable(nav.home);
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* 專案計畫（DTM） */
  if (isProject) {
    activate(nav.project);

    if (isProjectDetail) {
      enable(nav.project, () => history.back());
    } else {
      disable(nav.project);
    }

    enable(nav.home);
    disable(nav.path);
    enable(nav.timer);
    return;
  }

  /* 工具頁 */
  if (isTimer) {
    activate(nav.timer);
    disable(nav.timer);

    enable(nav.home);
    disable(nav.path);
    enable(nav.project);
  }
})();
