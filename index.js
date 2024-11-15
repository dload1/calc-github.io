// The JS code for calculator functions

document.addEventListener("DOMContentLoaded", function () {

  // event listeners for showing/hiding the simple/scientific calc
  // Degree and Radian buttons are shown in scientific calc only
  document.getElementById("simple").addEventListener("click", function () {
    document.getElementById("scientificCalc").style.display = "none";
    document.querySelectorAll("[name='degRad']").forEach((element) => {
      element.style.visibility = "hidden";
    });
  });

  document.getElementById("scientific").addEventListener("click", function () {
    document.getElementById("scientificCalc").style.display = "grid";
    document.querySelectorAll("[name='degRad']").forEach((element) => {
      element.style.visibility = "visible";
    });
  });

  // equation holds the field where data is entered
  // result holds the field where calculation result is displayed
  equation = document.getElementById("equationField");
  result = document.getElementById("resultField");

  // get the first and second function rows
  // note that these rows have opposite display properties
  firstFunRows = document.getElementsByClassName("firstFun");
  secondFunRows = document.getElementsByClassName("secondFun");

  // for trignometric functions conversion factor from deg/rad and vice-versa are needed
  // get all the trignometric functions (sin, cos, tan)
  let trigno = document.querySelectorAll(".trigno"),
    // get all the inverse trignometric functions (sin-¹, cos-¹, tan-¹)
    trignoInv = document.querySelectorAll(".trignoInv");

  // when degree is selected add "(Math.PI/180) * " to trigno and "(180/Math.PI) * " to inverse trignometric functions
  degree = document.getElementById("degree");
  degree.addEventListener("click", () => {
    trigno.forEach((e) => {
      // check if already the multiplication factor is not there, and add it
      if (!e.value.includes("(Math.PI/180)")) {
        e.value += "(Math.PI/180) * ";
      }
    });

    trignoInv.forEach((e) => {
      if (!e.value.includes("(180/Math.PI)")) {
        e.value = "(180/Math.PI) * " + e.value;
      }
    });
  });

  // remove the multiplication factors added earlier when radian is selected again
  let radian = document.getElementById("radian");
  radian.addEventListener("click", () => {
    trigno.forEach((e) => {
      if (e.value.includes("(Math.PI/180)")) {
        // here I have used the ternary operators as the replace() function did not work somehow to remove the factors added earlier
        e.value.includes("sin") ? (e.value = "Math.sin( ") : false;
        e.value.includes("cos") ? (e.value = "Math.cos( ") : false;
        e.value.includes("tan") ? (e.value = "Math.tan( ") : false;
      }
    });
    trignoInv.forEach((e) => {
      if (e.value.includes("(180/Math.PI)")) {
        e.value.includes("asin") ? (e.value = "Math.asin( ") : false;
        e.value.includes("acos") ? (e.value = "Math.acos( ") : false;
        e.value.includes("atan") ? (e.value = "Math.atan( ") : false;
      }
    });
  });

  // calculate the factorial
  function fact(x) {
    factResult = x;
    if (x < 0 || !Number.isInteger(x))
      return "Factorial is for +ve integers only";
    else if (x == 0) return 1;
    else {
      for (let i = x - 1; i > 1; i--) {
        factResult *= i;
      }
      return factResult;
    }
  }

  // calculate the square value
  function square(x) {
    if (isNaN(x)) return NaN;
    else return x * x;
  }

  // calculate the cube value
  function cube(x) {
    if (isNaN(x)) return NaN;
    else return x * x * x;
  }

  // This pattern will check if the display value in equation field is only a number(+ve,-ve,int, float etc) and not an expression. If so then the mathematical functions will directly pick it up as argument for further calculations
  // "^[\-]?" checks for presence or absence of - sign in start of number
  // "d+" checks for 1 or >1 digits before decimal
  // "\.?" checks, decimal point may ormay not be there
  // "\d*$" checks for zero or more digits after the decimal point till the end of number.
  // if the number is 45.567a it will be false as at the end only digits are allowed (ensured by $)
  // patternNumber1 checks for numbers like 1, 2, 2654, -12, -45, -456.265, -7879.0, 2.56 etc but not .789
  // patternNumber2 checks for numbers like 1, 2, -5, .265, 4.56, -454.565989 etc
  patternNumber1 = /^[\-]?\d+\.?\d*$/g;
  patternNumber2 = /^[\-]?\d*\.?\d+$/g;

  // get all the button elements
  let buttons = document.querySelectorAll(".btn");
  // ans holds the last evaluated result
  let ans;
  let mem = NaN;

  // actions to be performed for individual button press
  for (let item of buttons) {
    item.addEventListener("click", function () {

      switch (item.name) {
        case "clear":
          equation.value = "";
          result.value = "";
          break;

        case "equalButton":
          try {
            ans = result.value = eval(equation.value);
            equation.value += " =";
          } catch (err) {
            result.value = err.name;
          }
          break;

        case "backspace":
          equation.value = equation.value.slice(0, -1);
          result.value = "";
          break;

          // these code blocks are for showing the 2nd function row and hiding the first one
        case "second":
          for (let i = 0; i < firstFunRows.length; i++) {
            firstFunRows[i].style.display = "none";
            secondFunRows[i].style.display = "grid";
          }
          item.name = "first";
          item.innerHTML = "1<sup>st</sup>";
          break;

          // this case switches the 1st function row back altering the display properties of the two
        case "first":
          for (let i = 0; i < firstFunRows.length; i++) {
            firstFunRows[i].style.display = "grid";
            secondFunRows[i].style.display = "none";
          }
          item.name = "second";
          item.innerHTML = "2<sup>nd</sup>";
          break;

          // answer shows the last evaluated result
        case "answer":
          equation.value = ans;
          result.value = "";
          break;

          // change the plus/minus sign of the display/result value
        case "plusMinus":
          // check if the equation field ends in =, i.e. if it was evaluated
          if (equation.value.slice(-1) == "=") {
            // check if the result field is non-negative, and add "-". Else remove the minus
            if (result.value.slice(0, 1) != "-")
              equation.value = "-" + result.value;
            else equation.value = result.value.slice(1);
          }
          // check if the equation field starts with "-", and remove "-". Else add the minus
          else if (equation.value.slice(0, 1) == "-")
            equation.value = equation.value.slice(1);
          else equation.value = "-" + equation.value;
          break;

        case "percent":
          equation.value += " / 100";
          break;

        default:
          // check if the last character in the equation field is =, i.e. the equation was already evaluated and
          //we need to pick the value of the result directly if the corresponding keys are pressed
          //e.g. if result field shows 45, then clicking sin should result in Math.sin(45) in the equation field
          if (equation.value.slice(-1) == "=") {
            if (
              item.classList.contains("digit") ||
              item.classList.contains("mathConstant")
            ) {
              equation.value = item.value;
            } else if (item.classList.contains("plusMinusSymbols")) {
              equation.value = result.value + item.value;
            } else if (item.classList.contains("mathFunctions")) {
              equation.value = item.value + result.value + " ) ";
            } else if (item.id == "anyPower") {
              equation.value = item.value + result.value + ", ";
            } else if (item.value == "e") {
              equation.value = result.value + item.value;
            }
            result.value = "";
          }

          // check if the equation field contains only a number, then its math functions should be entered directly in the equation field
          // e.g. if equation shows 45, then clicking sin should result in Math.sin(45) in the equation field
          // further press the "=" to evaluate
          else if (
            patternNumber1.test(equation.value) ||
            patternNumber2.test(equation.value)
          ) {
            if (item.classList.contains("mathFunctions")) {
              equation.value = item.value + equation.value + " )";
              result.value = "";
            } else if (item.id == "anyPower") {
              equation.value = item.value + equation.value + ", ";
            } else if (item.name == "e") {
              equation.value += item.value;
            } else equation.value += item.value;
          }

          // for any other key presses:
          else equation.value += item.value;
          break;
      }
    });
  }
});