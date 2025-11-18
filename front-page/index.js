// -------------------------
// Tabs Class (all-in-one)
// -------------------------
class Tabs {
  constructor(selector) {
    this.tabsContainer =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;

    if (!this.tabsContainer) return;

    this.tabButtons = this.tabsContainer.querySelectorAll(".tabs__button");
    this.tabContents = this.tabsContainer.querySelectorAll(".tabs__content");

    // Link tabs by index (button 1 → content 1, etc.)
    this.tabButtons.forEach((tabButton, index) => {
      tabButton.addEventListener("click", () => this.tabClicked(index));
    });
  }

  tabClicked(index) {
    this.tabButtons.forEach((button) =>
      button.classList.remove("tabs__button--selected")
    );

    this.tabContents.forEach((content) =>
      content.classList.remove("tabs__content--selected")
    );

    const activeButton = this.tabButtons[index];
    const activeContent = this.tabContents[index];

    if (activeButton) activeButton.classList.add("tabs__button--selected");
    if (activeContent) activeContent.classList.add("tabs__content--selected");
  }
}

// -------------------------
// Activate both tab groups
// -------------------------

// Products tabs
new Tabs(".Products .tabs");

// Testimonial tabs
new Tabs(".testimonial .tabs");