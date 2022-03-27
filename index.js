document.addEventListener("DOMContentLoaded", function () {
  let ans;
  // document.getElementById("scientificCalc").style.display = "none";
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

  let buttons = document.querySelectorAll(".btn");

  // the following equation holds the field where data is entered
  // result holds the field where calculation result is displayed
  equation = document.getElementById("equationField");
  result = document.getElementById("resultField");

  // get the first and second function rows
  // note that these rows have opposite display properties
  firstFunRows = document.getElementsByClassName("firstFun");
  secondFunRows = document.getElementsByClassName("secondFun");

  function fact(x) {
    factResult = x;
    if (x < 0 || !Number.isInteger(x))
      return "Factorial is for +ve integers only";
    else if (x == 0) return 1;
    //else if (!Number.isInteger(x)) return "Factorial is for +ve integers only";
    else {
      for (let i = x - 1; i > 1; i--) {
        factResult *= i;
      }
      return factResult;
    }
  }

  function square(x) {
    if (isNaN(x)) return NaN;
    else return x * x;
  }

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

  // actions to be performed for individual button press
  for (let item of buttons) {
    item.addEventListener("click", function () {
      // console.log(typeof (equation.value));
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

        case "answer":
          equation.value = ans;
          result.value = "";
          break;

        case "plusMinus":
          if (equation.value.slice(-1) == "=") {
            //console.log(result.value.slice(0, 1))
            if (result.value.slice(0, 1) != "-")
              equation.value = "-" + result.value;
            else equation.value = result.value.slice(1);
          } else if (equation.value.slice(0, 1) == "-")
            equation.value = equation.value.slice(1);
          else equation.value = "-" + equation.value;
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
              if (
                item.classList.contains("trigno") &&
                document.getElementById("degree").checked == true
              ) {
                equation.value =
                  item.value + "(Math.PI/180) * " + result.value + " ) ";
              } else if (
                item.classList.contains("trignoInv") &&
                document.getElementById("degree").checked == true
              ) {
                equation.value =
                  "(180/Math.PI) * " + item.value + result.value + " ) ";
              } else equation.value = item.value + result.value + " ) ";
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
              if (
                item.classList.contains("trigno") &&
                document.getElementById("degree").checked == true
              ) {
                equation.value =
                  item.value + "(Math.PI/180) * " + equation.value + " )";
              } else if (
                item.classList.contains("trignoInv") &&
                document.getElementById("degree").checked == true
              ) {
                equation.value =
                  "(180/Math.PI) * " + item.value + equation.value + " )";
              } else equation.value = item.value + equation.value + " )";
              result.value = "";
            } else if (item.id == "anyPower") {
              //console.log("equation is: "+ equation.value);
              //console.log("item is: " + item.value);
              equation.value = item.value + equation.value + ", ";
            } else if (item.name == "e") {
              equation.value += item.value;
            } else equation.value += item.value;
          }

          // for any other key presses:
          // if any +-/*% symbol is pressed enter a space before and after
          /*  else if (item.classList.contains("plusMinusSymbols")) {
                  //console.log("equation is: "+ equation.value);
                  //console.log("item is: " + item.value);
                  equation.value += " ";
                  equation.value += item.value;
                  equation.value += " ";
                }*/

          // for others directly enter the key without space
          else equation.value += item.value;
          break;
      }
    });
  }
});
