document.addEventListener("scroll", function () {
    const offset = window.scrollY * 0.15;
    document.body.style.setProperty("--scroll-offset", `${offset}px`);
});