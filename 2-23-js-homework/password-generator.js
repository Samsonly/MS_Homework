const indicators = document.querySelectorAll(".indicators");
const selectorSection = document.querySelectorAll(".checkbox-section");
const uppercaseTrueText = document.querySelector("#uppercase-true");
const uppercaseFalseText = document.querySelector("#uppercase-false");
const lowercaseTrueText = document.querySelector("#lowercase-true");
const lowercaseFalseText = document.querySelector("#lowercase-false");
const numbersTrueText = document.querySelector("#numbers-true");
const numbersFalseText = document.querySelector("#numbers-false");
const specialcaseTrueText = document.querySelector("#specialcase-true");
const specialcaseFalseText = document.querySelector("#specialcase-false");
const generatePasswordButton = document.querySelector("#generate-password");
const copyButton = document.querySelector("#copy");

let lengthBar = document.querySelector("#password-length-bar-wrapper");
let lengthSlider = document.querySelector("#password-length-slider");
let lengthValue = document.querySelector("#password-length-value");

let uppercase = false;
let lowercase = false;
let numbers = false;
let specialcase = false;
let characterUseArray = [];
let activeArray = [];
let activeCount;
let firstLoad = true;

const uppercaseArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowercaseArray = "abcdefghijklmnopqrstuvwxyz".split("");
const numbersArray = "0123456789".split("");
const specialcaseArray = "~!@#$%^&*()_+[]{}|;:,.<>?".split("");
updateCharacterUseArray();

selectorSection.forEach((section) => {
  section.addEventListener("click", (event) => {
    const idTag = event.currentTarget.id;
    const redIndicator = section.querySelector(".red-indicator");
    const greenIndicator = section.querySelector(".green-indicator");
    switch (idTag) {
      case "uppercase":
        if (uppercase) {
          uppercase = false;
          redIndicator.style.display = "block";
          greenIndicator.style.display = "none";
          uppercaseTrueText.style.display = "none";
          uppercaseFalseText.style.display = "block";
        } else {
          uppercase = true;
          redIndicator.style.display = "none";
          greenIndicator.style.display = "block";
          uppercaseTrueText.style.display = "block";
          uppercaseFalseText.style.display = "none";
        }
        updateCharacterUseArray();
        break;
      case "lowercase":
        if (lowercase) {
          lowercase = false;
          redIndicator.style.display = "block";
          greenIndicator.style.display = "none";
          lowercaseTrueText.style.display = "none";
          lowercaseFalseText.style.display = "block";
        } else {
          lowercase = true;
          redIndicator.style.display = "none";
          greenIndicator.style.display = "block";
          lowercaseTrueText.style.display = "block";
          lowercaseFalseText.style.display = "none";
        }
        updateCharacterUseArray();
        break;
      case "numbers":
        if (numbers) {
          numbers = false;
          redIndicator.style.display = "block";
          greenIndicator.style.display = "none";
          numbersTrueText.style.display = "none";
          numbersFalseText.style.display = "block";
        } else {
          numbers = true;
          redIndicator.style.display = "none";
          greenIndicator.style.display = "block";
          numbersTrueText.style.display = "block";
          numbersFalseText.style.display = "none";
        }
        updateCharacterUseArray();
        break;
      case "specialcase":
        if (specialcase) {
          specialcase = false;
          redIndicator.style.display = "block";
          greenIndicator.style.display = "none";
          specialcaseTrueText.style.display = "none";
          specialcaseFalseText.style.display = "block";
        } else {
          specialcase = true;
          redIndicator.style.display = "none";
          greenIndicator.style.display = "block";
          specialcaseTrueText.style.display = "block";
          specialcaseFalseText.style.display = "none";
        }
        updateCharacterUseArray();
        break;
    }
  });
});

function updateCharacterUseArray() {
  characterUseArray = [uppercase, lowercase, numbers, specialcase];
  activeArray = characterUseArray.filter((value) => value === true);
  activeCount = activeArray.length;
  let initialValue = activeCount;

  let displayText;
  switch (activeCount) {
    case 0:
      displayText = "(Empty - please select at least one option)";
      break;
    case 1:
      displayText = "(Weak)";
      break;
    case 2:
      displayText = "(A little better)";
      break;
    case 3:
      displayText = "(There you go!)";
      break;
    case 4:
      displayText = "(Even you won't remember this password!!)";
      break;
    default:
      displayText = "Invalid count (aka Samson Messed Up the Code)";
  }

  document.getElementById("password-strength").textContent = displayText;
  if (firstLoad) {
    document.getElementById("password-length-value").value = initialValue;
    firstLoad = false;
  } else if (lengthValue.value < activeCount) {
    document.getElementById("password-length-value").value = activeCount;
  }
  let button = document.getElementById("generate-password");
  if (Number(lengthValue.value) === 0 || activeCount === 0) {
    button.classList.add("disabled");
  } else {
    button.classList.remove("disabled");
  }
}

lengthSlider.onmousedown = function (event) {
  event.preventDefault();

  document.onmousemove = function (event) {
    let newLeft = event.clientX - lengthBar.getBoundingClientRect().left;
    let rightEdge = lengthBar.offsetWidth - lengthSlider.offsetWidth;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > rightEdge) newLeft = rightEdge;

    lengthSlider.style.left = newLeft + "px";
    let number = Math.round(
      (newLeft / rightEdge) * (20 - activeCount) + activeCount
    );
    lengthValue.value = number;
  };

  document.onmouseup = function () {
    updateCharacterUseArray();
    document.onmousemove = null;
    document.onmouseup = null;
  };
};

lengthValue.addEventListener("input", function () {
  let number = parseInt(this.value);
  if (isNaN(number)) return;

  if (number < activeCount) number = activeCount;
  if (number > 20) number = 20;

  let rightEdge = lengthBar.offsetWidth - lengthSlider.offsetWidth;
  let newLeft = ((number - activeCount) / (20 - activeCount)) * rightEdge;

  lengthSlider.style.left = newLeft + "px";
  this.value = number;
  updateCharacterUseArray();
});

lengthBar.onclick = function (event) {
  let newLeft = event.clientX - lengthBar.getBoundingClientRect().left;
  let rightEdge = lengthBar.offsetWidth - lengthSlider.offsetWidth;
  if (newLeft < 0) newLeft = 0;
  if (newLeft > rightEdge) newLeft = rightEdge;

  lengthSlider.style.left = newLeft + "px";
  let number = Math.round(
    (newLeft / rightEdge) * (20 - activeCount) + activeCount
  );
  lengthValue.value = number;
  updateCharacterUseArray();
};

lengthSlider.ondragstart = function () {
  return false;
};

generatePasswordButton.addEventListener("click", function () {
  let passwordLength = lengthValue.value;
  let password = "";
  let characterArray = generatePassword();
  for (let i = 0; i < passwordLength; i++) {
    let randomIndex = Math.floor(Math.random() * characterArray.length);
    password += characterArray[randomIndex];
  }
  document.getElementById("password-output").textContent = password;
});

function generatePassword() {
  let characterArray = [];
  if (uppercase) {
    characterArray.push(...uppercaseArray);
  }
  if (lowercase) {
    characterArray.push(...lowercaseArray);
  }
  if (numbers) {
    characterArray.push(...numbersArray);
  }
  if (specialcase) {
    characterArray.push(...specialcaseArray);
  }
  return characterArray;
}

copyButton.addEventListener("click", function () {
  let password = document.getElementById("password-output").textContent;
  navigator.clipboard.writeText(password).then(
    function () {
      showDialog("Copying to clipboard was successful!");
    },
    function (err) {
      showDialog("Could not copy text: " + err);
    }
  );
});

function showDialog(message) {
  let dialog = document.getElementById("dialog");
  document.getElementById("dialog-text").textContent = message;
  dialog.classList.remove("hidden");

  setTimeout(function () {
    dialog.style.opacity = "0";
    setTimeout(function () {
      dialog.classList.add("hidden");
      dialog.style.opacity = "1";
    }, 500);
  }, 1000);
}
