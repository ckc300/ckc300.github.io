// nav-state.js
(function () {

  const nav = {
    home: document.querySelector('[data-nav="home"]'),
    path: document.querySelector('[data-nav="path"]'),
    project: document.querySelector('[data-nav="project"]'),
    timer: document.querySelector('[data-nav="timer"]')
  };

  const pathname = window.location.pathname;

  /* ================= 工具 ================= */

  function clear(el) {
    if (!el) return;
    el.classList.remove('active', 'disabled', 'back');
    el.removeAttribute('aria-disabled');
    el.onclick = null;
  }

  function setActive(el) {
    el?.classList.add('active');
  }

  function setDisabled(el) {
    if (!el) return;
    el.classList.add('disabled');
    el.setAttribute('aria-disabled', 'true');
    el.onclick = e => e.preventDefault();
  }

  function setBack(el) {
    if (!el) return;
    el.classList.add('back');
    el.onclick = () => history.back();
  }

  function resetAll() {
    Object.values(nav).forEach(clear);
  }

  /* ================= 路徑判斷 ================= */

  const isHome =
    pathname === '/' ||
    pathname === '/index.html';

  const isPathways = pathname.startsWith('/Projects/');
  const isDTM = pathname.startsWith('/DTM/');
  const isTimer = pathname.startsWith('/Timer/');

  const isPathwaysDetail = isPathways && /\/\d{4}_/.test(pathname);
  const isDTMDetail = isDTM && /\/\d{4}_/.test(pathname);

  /* ================= 狀態主流程 ================= */

  resetAll();

  /* ---------- Home ---------- */
  if (isHome) {
    setActive(nav.home);
    setDisabled(nav.home);

    setDisabled(nav.path);

    return;
  }

  /* ---------- Pathways ---------- */
  if (isPathways) {
    setActive(nav.path);

    if (isPathwaysDetail) {
      setBack(nav.path);           // 第三層：回上一頁
    } else {
      setDisabled(nav.path);       // 第二層：不可點
    }

    return;
  }

  /* ---------- DTM ---------- */
  if (isDTM) {
    setActive(nav.project);

    if (isDTMDetail) {
      setBack(nav.project);
    } else {
      setDisabled(nav.project);
    }

    setDisabled(nav.path);         // 不屬於此宇宙
    return;
  }

  /* ---------- Timer ---------- */
  if (isTimer) {
    setActive(nav.timer);
    setDisabled(nav.timer);

    setDisabled(nav.path);
  }

})();
