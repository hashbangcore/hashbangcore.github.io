(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");

  if (!toggle) return;

  const getTheme = () => root.getAttribute("data-theme") || "dark";
  const setTheme = (name) => root.setAttribute("data-theme", name);
  const updateState = (name) => {
    toggle.setAttribute("aria-pressed", name === "dark" ? "true" : "false");
    toggle.textContent = name === "dark" ? "Tema: oscuro" : "Tema: claro";
  };

  toggle.addEventListener("click", () => {
    const current = getTheme();
    const next = current === "light" ? "dark" : "light";
    setTheme(next);
    updateState(next);
  });

  updateState(getTheme());
})();
