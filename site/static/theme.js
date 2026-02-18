(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const gialloLight = document.getElementById("giallo-light");
  const gialloDark = document.getElementById("giallo-dark");

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

  setFromSystem();
  media.addEventListener("change", setFromSystem);
})();
