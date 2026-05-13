const valueInput = document.getElementById("valueInput");
const result = document.getElementById("result");
const optionsBox = document.getElementById("options");
const cats = document.querySelectorAll(".cat");
const swapBtn = document.getElementById("swapBtn");

let cat = "length";
let type = null;

/* DATA */
const data = {
  length: [
    ["km-m", "Km → m"],
    ["m-km", "m → Km"],
    ["cm-mm", "cm → mm"],
    ["mm-cm", "mm → cm"],
    ["inch-cm", "inch → cm"],
    ["cm-inch", "cm → inch"],
  ],
  weight: [
    ["kg-g", "kg → g"],
    ["g-kg", "g → kg"],
    ["lb-kg", "lb → kg"],
    ["kg-lb", "kg → lb"],
  ],
  temp: [
    ["c-f", "°C → °F"],
    ["f-c", "°F → °C"],
  ],
  currency: [
    ["usd-eur", "USD → EUR"],
    ["eur-usd", "EUR → USD"],
    ["usd-dzd", "USD → DZD"],
    ["dzd-usd", "DZD → USD"],
  ],
};

/* render options */
function render() {
  optionsBox.innerHTML = "";

  data[cat].forEach(([key, label]) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.textContent = label;

    if (key === type) btn.classList.add("active");

    btn.onclick = () => {
      document
        .querySelectorAll(".opt")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      type = key;
      convert();
    };

    optionsBox.appendChild(btn);
  });
}

/* convert */
function convert() {
  const v = parseFloat(valueInput.value);
  if (!type || isNaN(v)) {
    result.textContent = "0";
    return;
  }

  let o = 0;

  switch (type) {
    case "km-m":
      o = v * 1000;
      break;
    case "m-km":
      o = v / 1000;
      break;

    case "cm-mm":
      o = v * 10;
      break;
    case "mm-cm":
      o = v / 10;
      break;

    case "inch-cm":
      o = v * 2.54;
      break;
    case "cm-inch":
      o = v / 2.54;
      break;

    case "kg-g":
      o = v * 1000;
      break;
    case "g-kg":
      o = v / 1000;
      break;

    case "lb-kg":
      o = v * 0.453592;
      break;
    case "kg-lb":
      o = v * 2.20462;
      break;

    case "c-f":
      o = (v * 9) / 5 + 32;
      break;
    case "f-c":
      o = ((v - 32) * 5) / 9;
      break;

    case "usd-eur":
      o = v * 0.92;
      break;
    case "eur-usd":
      o = v * 1.09;
      break;

    case "usd-dzd":
      o = v * 135;
      break;
    case "dzd-usd":
      o = v * 0.0074;
      break;
  }

  result.textContent = o.toFixed(2);
}

/* categories */
cats.forEach((c) => {
  c.onclick = () => {
    cats.forEach((x) => x.classList.remove("active"));
    c.classList.add("active");

    cat = c.dataset.cat;
    type = null;

    render();
    result.textContent = "0";
  };
});

/* FIXED SWAP (REAL LOGIC) */
swapBtn.onclick = () => {
  if (!type) return;

  const reversed = type.split("-").reverse().join("-");

  const exists = data[cat].find((x) => x[0] === reversed);

  if (!exists) return; // safety

  type = reversed;

  render(); // re-render with correct active state
  convert(); // keep result updated
};

/* live input */
valueInput.addEventListener("input", convert);

/* init */
render();
