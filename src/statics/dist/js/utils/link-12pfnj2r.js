// src/client/module/utils/link.ts
(() => {
  async function managePageChange(pageUrl) {
    try {
      const response = await fetch(pageUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newContent = await response.text();
      history.pushState({ content: document.documentElement.outerHTML }, "", "");
      document.documentElement.innerHTML = newContent;
      history.pushState(null, "", pageUrl);
      simulatePageLoad();
    } catch (error) {
      console.error("Failed to load new page content:", error);
    }
  }
  function simulatePageLoad() {
    const domContentLoadedEvent = new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(domContentLoadedEvent);
    const loadEvent = new Event("load", {
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(loadEvent);
  }
  function setupNavListeners() {
    const navElements = document.querySelectorAll(".link");
    navElements.forEach((element) => {
      element.addEventListener("click", async (event) => {
        event.preventDefault();
        const newPageUrl = element.getAttribute("data-nav") ?? "/";
        await managePageChange(newPageUrl);
      });
    });
  }
  document.addEventListener("DOMContentLoaded", setupNavListeners);
  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.content) {
      document.documentElement.innerHTML = event.state.content;
      simulatePageLoad();
    } else {
      console.log("No state found. You might be on the initial page.");
    }
    console.log("Navigated back/forward in history");
  });
})();
