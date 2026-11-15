
const scanBtn = document.getElementById("scanBtn");

const buttonCount = document.getElementById("buttonCount");
const checkboxCount = document.getElementById("checkboxCount");
const status = document.getElementById("status");

scanBtn.addEventListener("click", async () => {
  status.textContent = "Scanning...";
  scanBtn.disabled = true;

  try {
    // Get the currently active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!tab?.id) {
      throw new Error("No active tab found.");
    }

    // Send message to content script
    const response = await chrome.tabs.sendMessage(
      tab.id,
      { action: "SCAN_PAGE" }
    );

    if (!response?.success) {
      throw new Error("Unable to scan this page.");
    }

    // Display results
    buttonCount.textContent = response.buttons;
    checkboxCount.textContent = response.checkboxes;

    status.textContent = "Scan completed successfully!";

  } catch (error) {
    console.error(error);

    status.textContent =
      "Cannot scan this page. Try refreshing the webpage.";

  } finally {
    scanBtn.disabled = false;
  }
});
