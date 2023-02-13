const btns = document.querySelectorAll(".btn");
const displayThing = document.querySelector(".display");

const btnArray = Array.from(btns);

const operator = ["+", "-", "*", "/"];

let haveDot = false;

dString = "";
const audio = new Audio("abcd.mp3");

btnArray.map((button, i) => {
  button.addEventListener("click", () => {
    displayThing.style.background = "";
    displayThing.style.color = "";

    displayThing.classList.remove("prank");
    const element = button.innerText;

    if (element === "AC") {
      dString = "";
      display(dString);
    }

    if (element === "C") {
      if (!dString) {
        return;
      } else {
        dString = dString.slice(0, -1);
        display(dString);
      }
    }

    if (element === "=") {
      const lastC = dString[dString.length - 1];

      if (operator.includes(lastC)) {
        //remove lastc

        dString = dString.slice(0, -1);
      }

      total();
      return;
    }

    if (operator.includes(element)) {
      if (!dString) {
        return;
      }

      haveDot = false;

      const lastC = dString[dString.length - 1];
      if (operator.includes(lastC)) {
        //remove last char

        dString = dString.slice(0, -1);
      }
    }

    if (element === ".") {
      if (!havedot) {
        return;
      }
      haveDot = true;
    }

    dString += element;
    display(dString);
  });
});

const randomNum = () => {
  const num = Math.round(Math.random() * 10);

  return num <= 5 ? num : 0;
};

const display = (str) => {
  displayThing.innerHTML = str || "0.00";
};

const total = () => {
  const extra = randomNum();

  if (extra) {
    displayThing.style.background = "yellow";
    displayThing.style.color = "red";

    displayThing.classList.add("prank");
    audio.play();
  }

  const calculate = eval(dString) + extra;
  dString = calculate;

  display(dString);
};
