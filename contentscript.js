if (typeof init == "undefined") {
  const init = function () {
    var s = document.createElement("script");
    s.src = chrome.runtime.getURL("script.js");
    document.body.appendChild(s);
  };

  var path = chrome.runtime.getURL("style.css");
  var l = document.createElement("link");
  l.href = path;
  l.type = "text/css";
  l.rel = "stylesheet";

  init();
}
