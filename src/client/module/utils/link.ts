// Ensure to have DOM types enabled in your tsconfig.json
// For example: "lib": ["DOM", "ESNext"]

// Add event listener for navigation button
const navButton = document.getElementById("navButton") as HTMLButtonElement;
navButton.addEventListener("mouseover", async () => {
  const newPageUrl: string = "/register"; // Change URL to /page2
  await managePageChange(newPageUrl); // Load new content
});

// Function to load new content dynamically
async function managePageChange(pageUrl: string): Promise<void> {
  try {
    const response: Response = await fetch(pageUrl); // Fetch the new page content
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newContent: string = await response.text(); // Get the response body as text

    // Update the history state
    history.pushState(null, "", pageUrl); // Change URL in the address bar

    // Replace the current body's inner HTML with the new content
    // const contentDiv = document.getElementById("content") as HTMLElement;
    console.log(newContent);
    // document.documentElement.innerHTML = newContent;
  } catch (error) {
    console.error("Failed to load new page content:", error);
  }
}

// Optional: Handle back/forward navigation
window.addEventListener("popstate", () => {
  // Logic to handle restoring the previous content if needed
  // You can either reload or keep track of content in history
  console.log("Navigated back/forward in history");
});
