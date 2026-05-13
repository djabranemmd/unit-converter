const inputValue = document.getElementById("inputValue");
const result = document.getElementById("result");
const optionsBox = document.getElementById("optionsBox");
const tabs = document.querySelectorAll(".tab");

let currentCategory = "length";
let currentType = null;

/* DATA */
const data = {
  length: [
    { label: "Km → m", value: "km-m" },
    { label: "m → Km", value: "m-km" },
    { label: "cm → mm", value: "cm-mm" },
    { label: "inch → cm", value: "inch-cm" },
  ],
  weight: [
    { label: "kg → g", value: "kg-g" },
    { label: "g → kg", value: "g-kg" },
    { label: "lb → kg", value: "lb-kg" },
  ],
  temp: [
    { label: "°C → °F", value: "c-f" },
    { label: "°F → °C", value: "f-c" },
  ],
  currency: [
    { label: "USD → EUR", value: "usd-eur" },
    { label: "EUR → USD", value: "eur-usd" },
    { label: "DZD → USD", value: "dzd-usd" },
  ],
};

/* render buttons */
function renderOptions() {
  optionsBox.innerHTML = "";

  data[currentCategory].forEach((item) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = item.label;
    btn.dataset.value = item.value;

    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".option-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentType = item.value;
      convert();
    });

    optionsBox.appendChild(btn);
  });
}

/* convert */
function convert() {
  const value = parseFloat(inputValue.value);

  if (!currentType || isNaN(value)) {
    result.textContent = "0";
    return;
  }

  let output = 0;

  switch (currentType) {
    case "km-m":
      output = value * 1000;
      break;
    case "m-km":
      output = value / 1000;
      break;
    case "cm-mm":
      output = value * 10;
      break;
    case "mm-cm":
      output = value / 10;
      break;
    case "inch-cm":
      output = value * 2.54;
      break;
    case "cm-inch":
      output = value / 2.54;
      break;

    case "kg-g":
      output = value * 1000;
      break;
    case "g-kg":
      output = value / 1000;
      break;
    case "lb-kg":
      output = value * 0.453592;
      break;
    case "kg-lb":
      output = value * 2.20462;
      break;

    case "c-f":
      output = (value * 9) / 5 + 32;
      break;
    case "f-c":
      output = ((value - 32) * 5) / 9;
      break;

    case "usd-eur":
      output = value * 0.92;
      break;
    case "eur-usd":
      output = value * 1.09;
      break;
    case "dzd-usd":
      output = value * 0.0074;
      break;

    default:
      output = 0;
  }

  result.textContent = output.toFixed(2);
}

/* tabs */
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    currentCategory = tab.dataset.category;
    currentType = null;

    renderOptions();
    result.textContent = "0";
  });
});

/* live input */
inputValue.addEventListener("input", convert);

/* init */
renderOptions();
