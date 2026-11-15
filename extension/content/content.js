chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SCAN_PAGE") {
    const candidates = selectCandidates();
    const extractedData = extractBasicProperties(candidates);

    console.log(extractedData);
    
    const buttonCount = document.querySelectorAll("button").length;

    const checkBoxCount = document.querySelectorAll(
      'input[type="checkbox"]',
    ).length;

    sendResponse({
      success: true,
      buttons: buttonCount,
      checkBoxes: checkBoxCount,
    });
  }

  return true;
});
