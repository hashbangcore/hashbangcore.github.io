(() => {
  const input = document.getElementById("search-input");
  const search = document.querySelector(".search");
  const navToggle = document.querySelector(".nav-toggle");
  const headerBar = document.querySelector(".header__bar");
  const alertsInner = document.querySelector(".alerts__inner");
  const main = document.querySelector(".app__content");
  const menu = headerBar ? headerBar.querySelector(".header__nav") : null;

  if (!input || !alertsInner || !window.searchIndex || !window.elasticlunr) return;

  const ensureLangPipeline = () => {
    const pipeline = window.elasticlunr.Pipeline;
    const noop = (token) => token;
    ["trimmer-es", "stopWordFilter-es", "stemmer-es"].forEach((name) => {
      if (!pipeline.registeredFunctions[name]) {
        pipeline.registerFunction(noop, name);
      }
    });
  };

  ensureLangPipeline();
  const idx = window.elasticlunr.Index.load(window.searchIndex);
  const docs = idx.documentStore?.docs || {};

  const ensureResults = () => {
    let el = alertsInner.querySelector(".search__results");
    if (!el) {
      el = document.createElement("div");
      el.className = "search__results";
      el.hidden = true;
      alertsInner.appendChild(el);
    }
    return el;
  };

  const getResults = () => alertsInner.querySelector(".search__results");

  const getLinks = (results) => Array.from(results.querySelectorAll("a"));

  const positionMenu = () => {
    if (!menu || !navToggle) return;
    const rect = navToggle.getBoundingClientRect();
    const padding = 16;
    menu.style.position = "fixed";
    menu.style.top = `${rect.bottom + 8}px`;
    menu.style.minWidth = "180px";
    menu.style.maxWidth = `calc(100vw - ${padding * 2}px)`;
    if (rect.left > window.innerWidth / 2) {
      menu.style.right = `${Math.max(padding, window.innerWidth - rect.right)}px`;
      menu.style.left = "auto";
    } else {
      menu.style.left = `${Math.max(padding, rect.left)}px`;
      menu.style.right = "auto";
    }
  };

  const resetMenuPosition = () => {
    if (!menu) return;
    menu.style.removeProperty("position");
    menu.style.removeProperty("top");
    menu.style.removeProperty("left");
    menu.style.removeProperty("right");
    menu.style.removeProperty("min-width");
    menu.style.removeProperty("max-width");
  };

  const closeMenu = () => {
    if (!headerBar || !navToggle) return;
    headerBar.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    resetMenuPosition();
  };

  const positionResults = () => {
    const rect = input.getBoundingClientRect();
    alertsInner.style.top = `${rect.bottom + 8}px`;
    alertsInner.style.left = `${rect.left}px`;
    alertsInner.style.width = `${rect.width}px`;
  };

  let activeIndex = -1;

  const setActive = (index) => {
    const results = getResults();
    if (!results) return;
    const links = getLinks(results);
    links.forEach((link, i) => {
      link.classList.toggle("is-active", i === index);
    });
    activeIndex = index;
  };

  const hideResults = (options = {}) => {
    const { clear = false, focus = false } = options;
    const results = getResults();
    if (!results) return;
    results.hidden = true;
    activeIndex = -1;
    if (clear) input.value = "";
    if (focus) input.focus();
    if (!focus && main) main.focus();
  };

  const renderResults = (items = []) => {
    const results = ensureResults();
    if (!items.length) {
      results.hidden = true;
      results.innerHTML = "";
      activeIndex = -1;
      return;
    }

    const list = document.createElement("ul");
    results.setAttribute("role", "listbox");
    items.forEach((item) => {
      const doc = docs[item.ref];
      if (!doc) return;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = doc.id || doc.permalink;
      a.textContent = doc.title || doc.id || doc.permalink;
      a.setAttribute("role", "option");
      li.appendChild(a);
      list.appendChild(li);
    });

    results.innerHTML = "";
    results.appendChild(list);
    results.hidden = false;
    setActive(-1);
  };

  const onSearch = () => {
    const query = input.value.trim();
    if (query.length < 2) {
      renderResults([]);
      return;
    }
    positionResults();
    let hits = [];
    try {
      hits = idx.search(query, { expand: true }) || [];
    } catch (_) {
      hits = [];
    }
    renderResults(hits.slice(0, 8));
  };

  input.addEventListener("input", onSearch);
  input.addEventListener("focus", onSearch);
  input.addEventListener("blur", () => {
    setTimeout(() => {
      const results = getResults();
      if (!results || results.hidden) return;
      const active = document.activeElement;
      if (results.contains(active) || active === input) return;
      hideResults({ clear: true });
    }, 0);
  });

  document.addEventListener("pointerdown", (event) => {
    const results = getResults();
    if (!results) return;
    if (search && search.contains(event.target)) return;
    if (!results.contains(event.target) && event.target !== input) {
      hideResults({ clear: true });
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (!menu || !headerBar || !headerBar.classList.contains("nav-open")) return;
    if (menu.contains(event.target) || (navToggle && navToggle.contains(event.target))) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    const results = getResults();
    if (!results || results.hidden) return;
    const links = getLinks(results);
    if (!links.length) return;
    if (event.key === "Tab") {
      event.preventDefault();
      const forward = !event.shiftKey;
      if (activeIndex < 0) {
        links[0].focus();
        setActive(0);
        return;
      }
      if (!forward && activeIndex === 0) {
        setActive(-1);
        input.focus();
        return;
      }
      const next = forward
        ? (activeIndex + 1) % links.length
        : (activeIndex - 1 + links.length) % links.length;
      links[next].focus();
      setActive(next);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const isDown = event.key === "ArrowDown";
      const next = activeIndex < 0
        ? (isDown ? 0 : links.length - 1)
        : (isDown ? Math.min(activeIndex + 1, links.length - 1) : Math.max(activeIndex - 1, 0));
      links[next].focus();
      setActive(next);
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      links[activeIndex].click();
    } else if (event.key === "Escape") {
      hideResults({ clear: true, focus: true });
    }
  });

  window.addEventListener("resize", () => {
    const results = getResults();
    if (results && !results.hidden) positionResults();
    if (headerBar && headerBar.classList.contains("nav-open")) positionMenu();
  });

  window.addEventListener("scroll", () => {
    const results = getResults();
    if (!results || results.hidden) return;
    hideResults({ clear: true });
  }, { passive: true });

  if (navToggle && headerBar) {
    navToggle.addEventListener("click", () => {
      const isOpen = headerBar.classList.contains("nav-open");
      if (isOpen) {
        closeMenu();
      } else {
        headerBar.classList.add("nav-open");
        navToggle.setAttribute("aria-expanded", "true");
        hideResults({ clear: true });
        positionMenu();
      }
    });
  }
})();
