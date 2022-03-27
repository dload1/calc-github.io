// The JS code for displaying/hiding the help/calculator

document.addEventListener("DOMContentLoaded", function () {
  helpButton = document.getElementById("helpButton");
  helpContents = document.getElementById("helpContents");
  closeHelpButton = document.getElementById("closeHelpButton");
  calculator = document.getElementById('calculator');

  // when help button is clicked display the help contents and hide the calculator
  // note that for help/close buttons i have used the "visibility" so that they are there only but hidden/shown
  // but for calc/helpContents i have used the "display" property so that they donot affect the layout of eachother when shown/hidden
  helpButton.addEventListener("click", (e) => {
    helpContents.style.display = "block";
    closeHelpButton.style.visibility = "visible";
    helpButton.style.visibility = "hidden";
    calculator.style.display = "none";
  });

  // when the help is closed display the calc and hide the help
  closeHelpButton.addEventListener("click", (e) => {
    helpContents.style.display = "none";
    helpButton.style.visibility = "visible";
    closeHelpButton.style.visibility = "hidden";
    calculator.style.display = "initial";
  });
});
