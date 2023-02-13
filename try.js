const allBtns = document.querySelectorAll(".btn");
const dislayArea = document.querySelector(".display");

btnList = Array.from(allBtns);

textToDisplay = "";

const operator = ["+", "-", "*", "/"];

let enableDot = "";

const audio = new Audio("abcd.mp3");

btnList.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    dislayArea.style.background = "";
    dislayArea.style.color = "black";
    dislayArea.classList.remove("prank");

    const target = btn.innerText;

    if (target === "Ac") {
      textToDisplay = "";
      updatedDisplay(textToDisplay);
      return;
    }

    if (target === "C") {
      if (textToDisplay.length) {
        textToDisplay = textToDisplay.slice(0, -1);
        updatedDisplay(textToDisplay);
      }
      return;
    }

    if (target === "=") {
      const lastCharacter = textToDisplay[textToDisplay.length - 1];

      if (operator.includes(lastCharacter)) {
        //remove last character
        textToDisplay = textToDisplay.slice(0, -1);
      }
      calculatedValue();
      return;
    }

    if (operator.includes(target)) {
      if (!textToDisplay) {
        return;
      }

      enableDot = "true";

      const lastCharacter = textToDisplay[textToDisplay.length - 1];
      if (operator.includes(lastCharacter)) {
        //remove last character

        textToDisplay = textToDisplay.slice(0, -1);
      }
    }

    if (target === ".") {
      if (!enableDot) {
        return;
      }
      enableDot = false;
    }

    textToDisplay += target;
    updatedDisplay(textToDisplay);
  });
});

const updatedDisplay = (str) => {
  dislayArea.innerHTML = str || "0.00";
};

const calculatedValue = () => {
  const extra = randomNumber();

  if (extra) {
    dislayArea.style.background = "red";
    dislayArea.style.color = "white";
    dislayArea.classList.add("prank");
    audio.play();
  }

  const total = eval(textToDisplay) + extra;
  textToDisplay = total;

  updatedDisplay(textToDisplay);
};

const randomNumber = () => {
  const num = Math.round(Math.random() * 10);
  return num <= 6 ? num : 0;
};
