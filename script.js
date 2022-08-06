function fetchData() {
  document.addEventListener("keydown", function (event) {
    if (event.altKey && event.code === "KeyX") {
      alert("Alt + X pressed!");
      event.preventDefault();
    }
  });

  document.getElementById("areaName").innerHTML = "hello";
}
fetchData();
