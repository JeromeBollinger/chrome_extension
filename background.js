try {
  //ON page change
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (!tab.url || !tab.url.startsWith("http")) {
      return;
    }
    if (changeInfo.status == "complete") {
      chrome.scripting.executeScript({
        files: ["script.js"],
        target: { tabId: tab.id },
      });
      chrome.scripting.insertCSS({
        files: ["style.css"],
        target: { tabId: tab.id },
      });
    }
  });
} catch (e) {
  console.log(e);
}
