// src/client/module/utils/link.ts
async function managePageChange(pageUrl) {
  try {
    const response = await fetch(pageUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newContent = await response.text();
    history.pushState(null, "", pageUrl);
    console.log(newContent);
  } catch (error) {
    console.error("Failed to load new page content:", error);
  }
}
var navButton = document.getElementById("navButton");
navButton.addEventListener("mouseover", async () => {
  const newPageUrl = "/register";
  await managePageChange(newPageUrl);
});
window.addEventListener("popstate", () => {
  console.log("Navigated back/forward in history");
});
