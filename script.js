var in_link_mode = false;
var labels = new Array();

// chrome.storage variables
var on;
var color;
var font;
chrome.storage.sync.get(["on"], function (items) {
  if(items["on"] == 1 || items["on"] == 0){
    on = items["on"];
  }
  else{
    on = 1;
  }
});

// initialize chrome storage
//chrome.storage.sync.set({ on: true }, function () {});
chrome.storage.onChanged.addListener(function () {
  chrome.storage.sync.get(["color", "font", "on"], function (items) {
    on = items["on"];
    color = items["color"];
    font = items["font"];
    console.log("item changed on: "+ on);
  })
});


function assign_color(label, a) {
  if (a.href == undefined || a.href == "") substring = "0";
  else var substring = a.href.substring(40);
  var color_hex =
    "#" + ((4 * parseInt(substring.hexEncode())) % 16777216).toString(16);
  while (color_hex.length < 7) {
    color_hex += "0";
  }
  a.style.color = color_hex;
  label.style.borderColor = color_hex;
}

function create_assign_label(counter, links_and_buttons) {
  var label = document.createElement("label");
  label.innerHTML = get_character(counter, links_and_buttons.length);
  label.classList.add("link_label");
  return label;
}

function remove_label_color() {
  console.log("remove");
  labels.forEach((label) => {
    label[0].remove();
    label[1].style.color = "";
  });
  labels = new Array();
}

function link_logic(event) {
  if (event.key !== ".") {
    labels.forEach((label) => {
      if (event.key === label[0].innerHTML[0]) {
        if (event.key === label[0].innerHTML) label[1].click();
        label[0].innerHTML = label[0].innerHTML.substring(1);
      } else {
        label[0].remove();
      }
    });
  }
}

function includes_href(href, a) {
  if (a.href != undefined) {
    if (a.href.includes(href)) return true;
  }
  return false;
}

chrome.storage.onChanged.addListener(function () {
  chrome.storage.sync.get(["color", "font"], function (items) {
    labels.forEach((label) => {
      label[0].style.backgroundColor = items["color"];
      label[0].style.color = items["font"];
    });
  });
});

function handle_link_navigation(event) {
  if (cursor_occupied()) return;
  if (!in_link_mode && !on) return;

  if (event.key === ".") {
    in_link_mode = !in_link_mode;
    if (in_link_mode) {
      var as = document.querySelectorAll("a, button");
      var counter = 0;
      var links_and_buttons = new Array();
      as.forEach((a) => {
        if (isInViewport(a)) {
          if (!includes_href("translate.google.com", a))
            links_and_buttons.push(a);
        }
      });

      links_and_buttons.forEach((a) => {
        counter++;
        var label = document.createElement("label");
        label.innerHTML = get_character(counter, links_and_buttons.length);
        label.classList.add("link_label");
        a.parentNode.insertBefore(label, a.nextSibling);
        assign_color(label, a);
        labels.push([label, a]);
        chrome.storage.sync.get(["color", "font"], function (items) {
          label.style.backgroundColor = items["color"];
          label.style.color = items["font"];
        });
      });
    }
  }
}

// aas.forEach((a) => {
//   counter++;
//   var label = document.createElement("label");
//   var chars = get_character(counter, aas.length);
//   label.innerHTML = chars;
//   label.classList.add("link_label");
//   a.parentNode.insertBefore(label, a.nextSibling);
//   var pair = [label, a.href];
//   labels.push(pair);
// });
// console.log(labels);

function add_listener() {
  document.addEventListener("keydown", function (event) {
    handle_navigation_event(event);
    handle_link_navigation(event);
    if (in_link_mode) {
      link_logic(event);
    } else {
      remove_label_color();
    }
  });
}
add_listener();

function get_character(number, max) {
  arr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  var return_string = "";

  if (max > arr.length) {
    var steps = Math.floor(number / arr.length);
    return_string += arr[steps];
  }
  return_string += arr[number % arr.length];
  return return_string;
}

var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};
String.prototype.hexEncode = function () {
  if (this == undefined || this == "") return "0000";
  var hex, i;

  var result = "";
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result;
};

function getStringBetween(str, start, end) {
  if (str == "" || str == undefined) return "0";
  const result = str.match(new RegExp(start + "(.*)" + end));
  return result[1];
}

function cursor_occupied() {
  occupied = false;
  keyboard_occupier = document.querySelectorAll("input, textarea");
  keyboard_occupier.forEach((occ) => {
    if (occ === document.activeElement) {
      occupied = true;
    }
  });
  return occupied;
}
function handle_navigation_event(event) {
  if (!cursor_occupied() && !in_link_mode && !event.ctrlKey && (on == 1)) {
    console.log(on);
    if (event.key === "n") {
      window.scrollBy({ top: 200, left: 0, behavior: "instant" });
      event.preventDefault();
    }
    if (event.key === "p") {
      window.scrollBy({ top: -200, left: 0, behavior: "instant" });
      event.preventDefault();
    }
    if (event.key === "f") {
      window.history.forward(1);
      event.preventDefault();
    }
    if (event.key === "b") {
      window.history.back(1);
      event.preventDefault();
    }
  }
}
