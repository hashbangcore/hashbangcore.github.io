(() => {
  const body = document.querySelector(".app__body");
  const resizer = document.querySelector(".app__resizer");

  if (!body || !resizer) return;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const onMouseMove = (event) => {
    const rect = body.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const px = clamp(x, 5, 500);
    body.style.setProperty("--sidebar-width", `${px}px`);
  };

  const stopResize = () => {
    body.classList.remove("is-resizing");
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", stopResize);
  };

  resizer.addEventListener("mousedown", (event) => {
    event.preventDefault();
    body.classList.add("is-resizing");
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopResize);
  });
})();
