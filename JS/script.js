const inputValue = document.getElementById("inputValue");
const conversionType = document.getElementById("conversionType");
const result = document.getElementById("result");

function convertUnits() {
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    result.textContent = "Please enter a valid number!";
    return;
  }

  const type = conversionType.value;

  let convertedValue;

  switch (type) {
    // =========================
    // Length Conversion
    // =========================

    case "km-m":
      convertedValue = value * 1000;
      break;

    case "m-km":
      convertedValue = value / 1000;
      break;

    case "cm-mm":
      convertedValue = value * 10;
      break;

    case "mm-cm":
      convertedValue = value / 10;
      break;

    case "inch-cm":
      convertedValue = value * 2.54;
      break;

    case "cm-inch":
      convertedValue = value / 2.54;
      break;

    // =========================
    // Weight Conversion
    // =========================

    case "kg-g":
      convertedValue = value * 1000;
      break;

    case "g-kg":
      convertedValue = value / 1000;
      break;

    case "lb-kg":
      convertedValue = value * 0.453592;
      break;

    case "kg-lb":
      convertedValue = value * 2.20462;
      break;

    // =========================
    // Temperature Conversion
    // =========================

    case "c-f":
      convertedValue = (value * 9) / 5 + 32;
      break;

    case "f-c":
      convertedValue = ((value - 32) * 5) / 9;
      break;

    // =========================
    // Currency Conversion
    // =========================

    case "usd-eur":
      convertedValue = value * 0.92;
      break;

    case "eur-usd":
      convertedValue = value * 1.09;
      break;

    case "dzd-usd":
      convertedValue = value * 0.0074;
      break;

    case "usd-dzd":
      convertedValue = value * 135;
      break;

    default:
      convertedValue = "Error";
  }

  result.textContent = convertedValue.toFixed(2);
}

// Convert while typing
inputValue.addEventListener("input", convertUnits);

// Convert when changing type
conversionType.addEventListener("change", convertUnits);
