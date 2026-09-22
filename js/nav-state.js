// nav-state.js
// 固定導覽列可能因螢幕寬度或字型載入而換行，讓總覽頁使用實際高度。
(function () {
  const header = document.querySelector('header');
  if (!header) return;

  function updateHeaderHeight() {
    if (window.getComputedStyle(header).position !== 'fixed') return;
    const height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--site-header-height', height + 'px');
  }

  updateHeaderHeight();
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateHeaderHeight).observe(header);
  }
  window.addEventListener('resize', updateHeaderHeight);
  window.addEventListener('load', updateHeaderHeight, { once: true });
  if (document.fonts) document.fonts.ready.then(updateHeaderHeight);
})();

(function () {
  const nav = {
    home: document.querySelector('[data-nav="home"]'),
    path: document.querySelector('[data-nav="path"]'),
    project: document.querySelector('[data-nav="project"]'),
    timer: document.querySelector('[data-nav="timer"]')
  };

  const pathName = window.location.pathname;

  /* ---------- 工具 ---------- */

  function clear(el) {
    if (!el) return;
    el.classList.remove('active', 'disabled');
    el.removeAttribute('aria-disabled');
    el.removeAttribute('aria-current');
    el.removeAttribute('aria-label');
    el.removeAttribute('role');
    el.removeAttribute('tabindex');
    el.onclick = null;
    el.onkeydown = null;
  }

  function activate(el, current = 'page') {
    if (!el) return;
    el.classList.add('active');
    el.setAttribute('aria-current', current);
  }

  function disable(el) {
    if (!el) return;
    el.classList.add('disabled');
    el.setAttribute('aria-disabled', 'true');
    el.removeAttribute('href');
    el.setAttribute('role', 'link');
    el.setAttribute('tabindex', '-1');
    el.onclick = e => e.preventDefault();
  }

  function blockClick(el) {
    if (!el) return;
    el.setAttribute('aria-disabled', 'true');
    el.setAttribute('tabindex', '-1');
    if (!el.hasAttribute('href')) el.setAttribute('role', 'link');
    el.onclick = e => e.preventDefault();
  }

  function enable(el, handler = null) {
    if (!el) return;
    el.classList.remove('disabled');
    el.removeAttribute('aria-disabled');
    if (handler) {
      // 返回依據瀏覽歷程；鍵盤與滑鼠使用同一個動作，避免 href 再次導頁。
      el.removeAttribute('href');
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', el.textContent.trim() + '：回上一頁');
      el.onclick = e => {
        e.preventDefault();
        handler();
      };
      el.onkeydown = e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        if (!e.repeat) el.click();
      };
    }
  }

  function resetAll() {
    Object.values(nav).forEach(clear);
  }

  /* ---------- 狀態判斷 ---------- */

  const isHome =
    pathName === '/' ||
    pathName === '/index.html' ||
    (pathName.endsWith('/index.html') &&
     !pathName.startsWith('/Projects/') &&
     !pathName.startsWith('/DTM/'));

  const isPathway = pathName.startsWith('/Projects/');
  const isProject = pathName.startsWith('/DTM/');
  const isTimer = pathName.startsWith('/Timer/');

  const isPathwayDetail = isPathway && /\/\d{4}_/.test(pathName);
  const isProjectDetail = isProject && /\/\d{4}_/.test(pathName);

  /* ---------- 主流程 ---------- */

  resetAll();

  /* 簡介頁保留四個入口，但不提供路徑導覽。 */
  if (document.body.classList.contains('learning-brief')) {
    disable(nav.path);
    enable(nav.home);
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* 首頁 */
  if (isHome) {
    activate(nav.home);
    blockClick(nav.home);

    disable(nav.path);      // 語意不存在
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* Pathways（我的路徑） */
  if (isPathway) {
    activate(nav.path, isPathwayDetail ? 'location' : 'page');

    if (isPathwayDetail) {
      enable(nav.path, () => history.back());
    } else {
      blockClick(nav.path);   // 第二層：高亮 + 不可點，但不灰
    }

    enable(nav.home);
    enable(nav.project);
    enable(nav.timer);
    return;
  }

  /* 專案計畫（DTM） */
  if (isProject) {
    activate(nav.project, isProjectDetail ? 'location' : 'page');

    if (isProjectDetail) {
      enable(nav.project, () => history.back());
    } else {
      blockClick(nav.project); // 第二層
    }

    enable(nav.home);
    disable(nav.path);        // 語意不存在
    enable(nav.timer);
    return;
  }

  /* 工具頁 */
  if (isTimer) {
    activate(nav.timer);
    blockClick(nav.timer);

    enable(nav.home);
    disable(nav.path);
    enable(nav.project);
  }
})();
