AOS.init({
  duration: 1500,
});
filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("filters");
var btns = btnContainer.getElementsByClassName("filter");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("activess");
    current[0].className = current[0].className.replace("activess", "");
    this.className += " activess";
  });
}

var cursor = {
  delay: 8,
  _x: 0,
  _y: 0,
  endX: window.innerWidth / 2,
  endY: window.innerHeight / 2,
  cursorVisible: true,
  cursorEnlarged: false,
  $dot: document.querySelector(".cursor-dot"),
  $outline: document.querySelector(".cursor-dot-outline"),

  init: function () {
    // Set up element sizes
    this.dotSize = this.$dot.offsetWidth;
    this.outlineSize = this.$outline.offsetWidth;

    this.setupEventListeners();
    this.animateDotOutline();
  },

  //     updateCursor: function(e) {
  //         var self = this;

  //         console.log(e)

  //         // Show the cursor
  //         self.cursorVisible = true;
  //         self.toggleCursorVisibility();

  //         // Position the dot
  //         self.endX = e.pageX;
  //         self.endY = e.pageY;
  //         self.$dot.style.top = self.endY + 'px';
  //         self.$dot.style.left = self.endX + 'px';
  //     },

  setupEventListeners: function () {
    var self = this;

    // Anchor hovering
    document.querySelectorAll("a").forEach(function (el) {
      el.addEventListener("mouseover", function () {
        self.cursorEnlarged = true;
        self.toggleCursorSize();
      });
      el.addEventListener("mouseout", function () {
        self.cursorEnlarged = false;
        self.toggleCursorSize();
      });
    });

    // Click events
    document.addEventListener("mousedown", function () {
      self.cursorEnlarged = true;
      self.toggleCursorSize();
    });
    document.addEventListener("mouseup", function () {
      self.cursorEnlarged = false;
      self.toggleCursorSize();
    });

    document.addEventListener("mousemove", function (e) {
      // Show the cursor
      self.cursorVisible = true;
      self.toggleCursorVisibility();

      // Position the dot
      self.endX = e.pageX;
      self.endY = e.pageY;
      self.$dot.style.top = self.endY + "px";
      self.$dot.style.left = self.endX + "px";
    });

    // Hide/show cursor
    document.addEventListener("mouseenter", function (e) {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.$dot.style.opacity = 1;
      self.$outline.style.opacity = 1;
    });

    document.addEventListener("mouseleave", function (e) {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.$dot.style.opacity = 0;
      self.$outline.style.opacity = 0;
    });
  },

  animateDotOutline: function () {
    var self = this;

    self._x += (self.endX - self._x) / self.delay;
    self._y += (self.endY - self._y) / self.delay;
    self.$outline.style.top = self._y + "px";
    self.$outline.style.left = self._x + "px";

    requestAnimationFrame(this.animateDotOutline.bind(self));
  },

  toggleCursorSize: function () {
    var self = this;

    if (self.cursorEnlarged) {
      self.$dot.style.transform = "translate(-50%, -50%) scale(0.75)";
      self.$outline.style.transform = "translate(-50%, -50%) scale(1.5)";
    } else {
      self.$dot.style.transform = "translate(-50%, -50%) scale(1)";
      self.$outline.style.transform = "translate(-50%, -50%) scale(1)";
    }
  },

  toggleCursorVisibility: function () {
    var self = this;

    if (self.cursorVisible) {
      self.$dot.style.opacity = 1;
      self.$outline.style.opacity = 1;
    } else {
      self.$dot.style.opacity = 0;
      self.$outline.style.opacity = 0;
    }
  },
};

cursor.init();

/* ===== Helper Functions ===== */
function copyToClipboard(inputText) {
  const el = document.createElement("textarea");
  el.value = inputText;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  /* Alert the copied text */
  alert("Copied the text: " + inputText);
}

function updateStyleChecker() {
  if (!debug) {
    let debuggerElement = document.getElementById("debugger");

    if (window.getComputedStyle(debuggerElement).display === "none") {
      return;
    } else {
      debuggerElement.style.display = "none";
    }
  }

  let styleCheckerContent = "";

  let styleElements = document.getElementsByTagName("style");

  for (let i = 0; i < styleElements.length; i++) {
    if (!styleElements[i].id) {
      continue;
    }

    styleCheckerContent += `id: ${styleElements[i].id}`;
    styleCheckerContent += styleElements[i].innerHTML;
    styleCheckerContent += "<br>";
  }

  document.getElementById("styleChecker").innerHTML = styleCheckerContent;
}

function getInputValue(inputId) {
  return document.getElementById(inputId).value;
}

function updateDisplayCSS(className, value) {
  let elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = String(value).trim();
  }
}

function updateThumbColor() {
  thumbColor = getInputValue("thumbColor");

  document.getElementById("styleThumbColor").innerHTML = `
    *::-webkit-scrollbar-thumb {
      background-color: ${thumbColor};
    }
  `;

  document.getElementById("styleColor").innerHTML = `
    * {
      scrollbar-color: ${thumbColor} ${trackColor};
    }
  `;

  updateDisplayCSS("displayThumbColor", thumbColor);

  updateStyleChecker();
}

function updateTrackColor() {
  trackColor = getInputValue("trackColor");

  document.getElementById("styleTrackColor").innerHTML = `
    *::-webkit-scrollbar-track {
      background: ${trackColor};
    }
  `;

  document.getElementById("styleColor").innerHTML = `
    * {
      scrollbar-color: ${thumbColor} ${trackColor};
    }
  `;

  updateDisplayCSS("displayTrackColor", trackColor);

  updateStyleChecker();
}

function updateWidthStyle() {
  widthStyle = getInputValue("widthStyle");

  document.getElementById("styleWidthStyle").innerHTML = `
    * {
      scrollbar-width: ${widthStyle};
    }
  `;

  updateDisplayCSS("displayWidthStyle", widthStyle);

  updateStyleChecker();
}

function updateWidth() {
  width = getInputValue("width");

  document.getElementById("styleWidth").innerHTML = `
    *::-webkit-scrollbar {
      width: ${width}px;
    }
  `;

  updateDisplayCSS("displayWidth", width);

  updateStyleChecker();
}

function updateBorderRadius() {
  borderRadius = getInputValue("borderRadius");

  document.getElementById("styleBorderRadius").innerHTML = `
    *::-webkit-scrollbar-thumb {
      border-radius: ${borderRadius}px;
    }
  `;

  updateDisplayCSS("displayBorderRadius", borderRadius);

  updateStyleChecker();
}

function updateBorderWidth() {
  borderWidth = getInputValue("borderWidth");

  document.getElementById("styleBorder").innerHTML = `
    *::-webkit-scrollbar-thumb {
      border: ${borderWidth}px ${borderStyle} ${borderColor};
    }
  `;

  updateDisplayCSS("displayBorderWidth", borderWidth);

  updateStyleChecker();
}

function updateBorderStyle() {
  borderStyle = getInputValue("borderStyle");

  document.getElementById("styleBorder").innerHTML = `
    *::-webkit-scrollbar-thumb {
      border: ${borderWidth}px ${borderStyle} ${borderColor};
    }
  `;

  updateDisplayCSS("displayBorderStyle", borderStyle);

  updateStyleChecker();
}

function updateBorderColor() {
  borderColor = getInputValue("borderColor");

  document.getElementById("styleBorder").innerHTML = `
    *::-webkit-scrollbar-thumb {
      border: ${borderWidth}px ${borderStyle} ${borderColor};
    }
  `;

  updateDisplayCSS("displayBorderColor", borderColor);

  updateStyleChecker();
}

/* ===== Setup ===== */
let debug = false;

let thumbColor = getInputValue("thumbColor");
let trackColor = getInputValue("trackColor");
let widthStyle = getInputValue("widthStyle");
let width = getInputValue("width");
let borderRadius = getInputValue("borderRadius");
let borderWidth = getInputValue("borderWidth");
let borderStyle = getInputValue("borderStyle");
let borderColor = getInputValue("borderColor");

updateThumbColor();
updateTrackColor();
updateWidthStyle();
updateWidth();
updateBorderRadius();
updateBorderWidth();
updateBorderStyle();
updateBorderColor();

updateStyleChecker();

/* ===== Event Listeners ===== */
document
  .getElementById("thumbColor")
  .addEventListener("change", updateThumbColor);
document
  .getElementById("trackColor")
  .addEventListener("change", updateTrackColor);
document
  .getElementById("widthStyle")
  .addEventListener("change", updateWidthStyle);
document.getElementById("width").addEventListener("change", updateWidth);
document
  .getElementById("borderRadius")
  .addEventListener("change", updateBorderRadius);
document
  .getElementById("borderWidth")
  .addEventListener("change", updateBorderWidth);
document
  .getElementById("borderStyle")
  .addEventListener("change", updateBorderStyle);
document
  .getElementById("borderColor")
  .addEventListener("change", updateBorderColor);

document
  .getElementsByClassName("copy")[0]
  .addEventListener("click", function () {
    let copyText = document.getElementById("cssCode").innerText;

    copyToClipboard(copyText);
  });

document
  .getElementsByClassName("info")[0]
  .addEventListener("click", function () {
    let instructions = document.getElementsByClassName("instructions")[0];

    if (window.getComputedStyle(instructions).display === "none") {
      instructions.style.display = "inline";
      instructions.classList.add("slide-left");
      instructions.classList.remove("slide-right");
    } else {
      instructions.classList.add("slide-right");
      instructions.classList.remove("slide-left");
      setTimeout(function () {
        instructions.style.display = "none";
      }, 500);
    }
  });
