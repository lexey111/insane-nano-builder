"use strict";
(() => {
  // src/js/utils/gauges.ts
  function initGauges() {
    const gaugesContainer = document.querySelector("#gauges");
    if (!gaugesContainer) {
      console.error("No gauges found.");
      return;
    }
    const componentsObserver = new ResizeObserver((c) => {
      var _a, _b;
      if (((_b = (_a = c[0]) == null ? void 0 : _a.contentRect) == null ? void 0 : _b.height) > 200) {
        console.log("Web components loaded");
        assignButtons();
        gaugesContainer.classList.add("loaded");
      }
    });
    console.log("Size watcher attached", gaugesContainer);
    componentsObserver.observe(gaugesContainer);
  }
  function assignButtons() {
    const ring = document.querySelector("progress-ring");
    const buttonOne = document.querySelector("#buttonOne");
    const buttonTwo = document.querySelector("#buttonTwo");
    const buttonThree = document.querySelector("#buttonThree");
    buttonOne == null ? void 0 : buttonOne.addEventListener("click", () => {
      ring == null ? void 0 : ring.setAttribute("percentage", "30");
    });
    buttonTwo == null ? void 0 : buttonTwo.addEventListener("click", () => {
      ring == null ? void 0 : ring.setAttribute("percentage", "60");
    });
    buttonThree == null ? void 0 : buttonThree.addEventListener("click", () => {
      ring == null ? void 0 : ring.setAttribute("percentage", "90");
    });
  }

  // src/js/dashboard.js
  console.log("Dashboard init");
  initGauges();
})();
