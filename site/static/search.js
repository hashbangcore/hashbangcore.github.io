(() => {
  const input = document.getElementById("search-input");
  const alertsRoot = document.querySelector(".app__alerts");
  const alertsInner = document.querySelector(".alerts__inner");

  if (!input || !alertsRoot || !alertsInner || !window.searchIndex || !window.elasticlunr) return;

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

  const positionResults = () => {
    const rect = input.getBoundingClientRect();
    alertsInner.style.top = `${rect.bottom + 8}px`;
    alertsInner.style.left = `${rect.left}px`;
    alertsInner.style.width = `${rect.width}px`;
  };

  const renderResults = (items = []) => {
    const results = ensureResults();
    if (!items.length) {
      results.hidden = true;
      results.innerHTML = "";
      return;
    }

    const list = document.createElement("ul");
    items.forEach((item) => {
      const doc = docs[item.ref];
      if (!doc) return;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = doc.id || doc.permalink;
      a.textContent = doc.title || doc.id || doc.permalink;
      li.appendChild(a);
      list.appendChild(li);
    });

    results.innerHTML = "";
    results.appendChild(list);
    results.hidden = false;
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

  document.addEventListener("click", (event) => {
    const results = alertsInner.querySelector(".search__results");
    if (!results) return;
    if (!results.contains(event.target) && event.target !== input) {
      results.hidden = true;
    }
  });

  window.addEventListener("resize", () => {
    const results = alertsInner.querySelector(".search__results");
    if (results && !results.hidden) positionResults();
  });
})();
