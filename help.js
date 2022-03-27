document.addEventListener("DOMContentLoaded", function () {
  helpButton = document.getElementById("helpButton");
  helpContents = document.getElementById("helpContents");
  closeHelpButton = document.getElementById("closeHelpButton");
  calculator = document.getElementById('calculator');
  helpButton.addEventListener("click", (e) => {
    helpContents.style.display = "block";
    closeHelpButton.style.visibility = "visible";
    helpButton.style.visibility = "hidden";
    calculator.style.display = "none";
  });
  closeHelpButton.addEventListener("click", (e) => {
    helpContents.style.display = "none";
    helpButton.style.visibility = "visible";
    closeHelpButton.style.visibility = "hidden";
    calculator.style.display = "initial";
  });

});
