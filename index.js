document.getElementById("color").addEventListener(
  "change",
  function (event) {
    chrome.storage.sync.set({ color: event.target.value }, function () {});
  },
  false
);
document.getElementById("font").addEventListener(
  "change",
  function (event) {
    chrome.storage.sync.set({ font: event.target.value }, function () {});
  },
  false
);
