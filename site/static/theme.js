(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const gialloLight = document.getElementById("giallo-light");
  const gialloDark = document.getElementById("giallo-dark");
  const headerBar = document.querySelector(".header__bar");
  const appBody = document.querySelector(".app__body");
  const article = document.querySelector(".app__content > article");
  const compactMedia = window.matchMedia("(max-width: 1024px)");

  if (!toggle) return;

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const storageKey = "theme-preference";

  const getTheme = () => root.getAttribute("data-theme") || "dark";
  const setTheme = (name) => root.setAttribute("data-theme", name);
  const updateState = (name) => {
    toggle.setAttribute("aria-pressed", name === "dark" ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      name === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    );
    if (gialloLight && gialloDark) {
      gialloLight.disabled = name !== "light";
      gialloDark.disabled = name !== "dark";
    }
  };

  const setFromSystem = () => {
    const stored = sessionStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      updateState(stored);
      return;
    }
    const next = media.matches ? "dark" : "light";
    setTheme(next);
    updateState(next);
  };

  toggle.addEventListener("click", () => {
    const current = getTheme();
    const next = current === "light" ? "dark" : "light";
    setTheme(next);
    updateState(next);
    sessionStorage.setItem(storageKey, next);
  });

  const updateHeaderState = () => {
    if (!headerBar) return;
    const threshold = headerBar.offsetHeight;
    if (compactMedia.matches && article) {
      const rect = article.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const bottom = top + rect.height;
      const marker = window.scrollY + threshold;
      const isInMain = marker >= top && marker < bottom;
      headerBar.classList.toggle("is-stuck", isInMain);
      return;
    }
    if (!appBody) return;
    const bodyTop = appBody.getBoundingClientRect().top;
    headerBar.classList.toggle("is-stuck", bodyTop <= threshold);
  };

  setFromSystem();
  media.addEventListener("change", setFromSystem);

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
  document.addEventListener("scroll", updateHeaderState, { passive: true, capture: true });
  window.addEventListener("resize", updateHeaderState);
  compactMedia.addEventListener("change", updateHeaderState);
})();
