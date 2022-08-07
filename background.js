try {
  //ON page change
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      //if (changeInfo.url) {
      chrome.scripting.executeScript({
        files: ["script.js"],
        target: { tabId: tab.id },
      });
      chrome.scripting.insertCSS({
        files: ["style.css"],
        target: { tabId: tab.id },
      });

      //}
    }
  });
} catch (e) {
  console.log(e);
}
