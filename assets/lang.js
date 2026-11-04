// Выбор языка страницы: ?lang=ru|en → сохранённый выбор → язык браузера.
(function () {
  var root = document.documentElement;
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "ru" || q === "en") return q;
    try { var s = localStorage.getItem("lang"); if (s === "ru" || s === "en") return s; } catch (e) {}
    return (navigator.language || "").toLowerCase().indexOf("ru") === 0 ? "ru" : "en";
  }
  function apply(l) {
    root.classList.remove("lang-ru", "lang-en");
    root.classList.add("js", "lang-" + l);
    root.lang = l;
    var t = root.getAttribute("data-title-" + l);
    if (t) document.title = t;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.set === l ? "true" : "false");
    });
  }
  apply(pick());
  document.addEventListener("DOMContentLoaded", function () {
    apply(root.lang);
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem("lang", b.dataset.set); } catch (e) {}
        apply(b.dataset.set);
      });
    });
  });
})();
