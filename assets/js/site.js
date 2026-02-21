(function () {
  "use strict";

  var THEME_STORAGE_KEY = "le-nicolas-theme";
  var body = document.body;
  var themeToggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    var isLight = theme === "light";
    body.classList.toggle("light", isLight);

    if (themeToggle) {
      var nextModeLabel = isLight ? "Switch to dark mode" : "Switch to light mode";
      themeToggle.textContent = isLight ? "☽" : "☀";
      themeToggle.setAttribute("aria-label", nextModeLabel);
      themeToggle.setAttribute("title", nextModeLabel);
    }
  }

  function initThemeToggle() {
    var defaultTheme = "dark";

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      defaultTheme = "light";
    }

    try {
      var savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      applyTheme(savedTheme || defaultTheme);
    } catch (error) {
      applyTheme(defaultTheme);
    }

    if (!themeToggle) {
      return;
    }

    themeToggle.addEventListener("click", function () {
      var nextTheme = body.classList.contains("light") ? "dark" : "light";
      applyTheme(nextTheme);

      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch (error) {
        // Ignore localStorage errors and keep the in-memory state.
      }
    });
  }

  function initHomeFilters() {
    var postsGrid = document.getElementById("postsGrid");
    if (!postsGrid) {
      return;
    }

    var searchInput = document.getElementById("searchInput");
    var tagButtons = Array.prototype.slice.call(document.querySelectorAll(".tag-btn[data-tag-filter]"));
    var cards = Array.prototype.slice.call(postsGrid.querySelectorAll(".post-card"));
    var noResults = document.getElementById("noResults");
    var currentTag = "all";

    function filterCards() {
      var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      var visibleCount = 0;

      cards.forEach(function (card) {
        var cardTags = (card.getAttribute("data-tags") || "").toLowerCase();
        var tags = cardTags ? cardTags.split("|") : [];
        var text = (card.textContent || "").toLowerCase();

        var tagMatch = currentTag === "all" || tags.indexOf(currentTag) !== -1;
        var textMatch = !query || text.indexOf(query) !== -1;
        var isVisible = tagMatch && textMatch;

        card.hidden = !isVisible;
        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (noResults) {
        noResults.hidden = visibleCount > 0;
      }
    }

    tagButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        currentTag = (button.getAttribute("data-tag-filter") || "all").toLowerCase();

        tagButtons.forEach(function (item) {
          item.classList.toggle("active", item === button);
        });

        filterCards();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", filterCards);
    }

    filterCards();
  }

  function initReadingHud() {
    var article = document.querySelector("[data-reading-root]");
    var hud = document.getElementById("readingHud");
    var topProgress = document.getElementById("topProgress");

    if (!article || !hud || !topProgress) {
      return;
    }

    var ringFill = document.getElementById("ringFill");
    var ringPct = document.getElementById("ringPct");
    var timeLeft = document.getElementById("timeLeft");
    var sectionsWrap = document.getElementById("hudSections");
    var topButton = document.getElementById("hudTopBtn");

    var headings = Array.prototype.slice.call(
      article.querySelectorAll(".article-body h2[id], .article-body h3[id]")
    );

    var totalWords = Number(article.getAttribute("data-word-count")) || 0;
    var totalMinutes = Math.max(1, Math.ceil(totalWords / 220));
    var circumference = 106.8;

    if (topButton) {
      topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    if (sectionsWrap) {
      sectionsWrap.innerHTML = "";

      headings.forEach(function (heading) {
        var title = heading.textContent ? heading.textContent.trim() : "Section";
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "section-dot";
        dot.setAttribute("data-title", title);
        dot.setAttribute("aria-label", "Jump to " + title);

        dot.addEventListener("click", function () {
          heading.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        sectionsWrap.appendChild(dot);
      });
    }

    hud.hidden = false;
    topProgress.hidden = false;

    function updateProgress() {
      var start = article.offsetTop;
      var end = start + article.scrollHeight - window.innerHeight;
      var range = Math.max(1, end - start);
      var rawProgress = (window.scrollY - start) / range;
      var progress = Math.max(0, Math.min(1, rawProgress));
      var pct = Math.round(progress * 100);

      topProgress.style.width = pct + "%";

      if (ringFill) {
        ringFill.style.strokeDashoffset = String(circumference - progress * circumference);
      }

      if (ringPct) {
        ringPct.textContent = pct + "%";
      }

      if (timeLeft) {
        var minsLeft = Math.max(0, Math.ceil(totalMinutes * (1 - progress)));
        timeLeft.textContent = minsLeft <= 1 ? "<1m" : minsLeft + "m";
      }

      if (sectionsWrap && headings.length > 0) {
        var dots = Array.prototype.slice.call(sectionsWrap.querySelectorAll(".section-dot"));
        var activeIndex = -1;
        var viewportAnchor = window.innerHeight * 0.35;

        headings.forEach(function (heading, index) {
          if (heading.getBoundingClientRect().top <= viewportAnchor) {
            activeIndex = index;
          }
        });

        if (activeIndex === -1) {
          activeIndex = 0;
        }

        dots.forEach(function (dot, index) {
          dot.classList.toggle("active", index === activeIndex);
        });
      }
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  initThemeToggle();
  initHomeFilters();
  initReadingHud();
})();
