chrome.storage.sync.get(["on"], function (items) {
  var button = document.getElementById("on_button")
  if(items["on"] == 1){
    set_button_on();
  }
  else{
    set_button_off();
  }
});

function set_button_off(){
  var button = document.getElementById("on_button")
  button.innerHTML = "off"
  button.value = 0;
  button.classList.remove("on_button");
  button.classList.add("off_button");
}

function set_button_on(){
  var button = document.getElementById("on_button")
  button.innerHTML = "on"
  button.value = 1;
  button.classList.add("on_button");
  button.classList.remove("off_button");
}


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

document.getElementById("on_button").addEventListener(
  "click",
  function () {
    var button = document.getElementById("on_button");
    var on = button.value;
    if(on == 1){
      set_button_off();
      chrome.storage.sync.set({ on: 0 }, function () {});
    }
    else{
      set_button_on();
      chrome.storage.sync.set({ on: 1 }, function () {});
    }
    document.getElementById("debug").innerHTML = on;
    
  },
  false
);