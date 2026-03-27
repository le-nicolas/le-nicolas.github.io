(function () {
  "use strict";

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
  initHomeFilters();
})();
