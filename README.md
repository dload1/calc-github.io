# CALCULATOR
## Video Demo:  https://youtu.be/uqpe8bX9-2I
## Description:

I have made a calculator using HTML, CSS and JS. This calculator offers the options of using the simple calculator layout as well as the scientific options. Select the corresponding radio button to get the desired calc layout. By default simple calc is displayed and the scientific calc is hidden.

## _Features_:
- This calc works between a traditional calc and a computer. You may type your calculation equations(rather than only one function/number etc) in the equation field and then press the "=" button to evaluate the total calculation.
e.g. you may type:
```
      52 - 89² + √67 + sin(89) - ln(87)
```
in the equation at once and the calc will evaluate it.
- Mobile friendly display
- Options for simple/scientific calc
- Calculations in degree/radians for trignometric functions


## _Limitations:_
- Due to inaccuracies in JS floating point arithmetic the results may be weird at times. e.g.sin(π) displays a non-zero number 1e-16 instead of exact zero.
- For all mathematical functions/expressions where open brackets are there, they need to be closed manually. Otherwise error will be there.
- Though the mathematical function buttons display the exact name, the name displayed in the equation field is the corresponding JS function name or the name of function defined by me.
e.g. sin(x) is displayed as Math.sin(x).
x² is displayed as square(x).

## Project Implementation:

There are 4 files in the project:
- [index.html](index.html)
- [index.js](index.js)
- [help.js](help.js)
- [styles.css](styles.css)

1. As easily understood, [index.html](index.html) holds the required HTML code. It has different components.
   - help and closeHelp buttons for displaying help contents. Their visibility is hidden/shown so that they remain in their fixed places.
   - helpContents described below depict the basics regarding the calc working.
   - Two display fields: first for displaying the user input and the second containing the calculated result.
   - Radio buttons for selecting the simple/scientific calc options.
   - Radio buttons for selecting degree/radians angle format for trignometric functions.
   - Layout for simple calc buttons. Different colors have been allotted for categories of buttons.
   - Layout for scientific calc buttons. By default it is hidden and shown only when the option is selected.


2. [index.js](index.js) holds the JS code for the calculator display mainly.
   - It also has the code for alternating between the 2nd function buttons e.g. between sin and asin.
   - As the JS calculations are done in radians by default, the code does modifications accordingly.
   - Also, it has code for hiding/showing the simple/scientific options.
   - It has several event listeners for checking whether the equation display field has numbers only, and then, when a mathematical function key is pressed it picks up the equation number as argument directly like in a regular calculator. e.g if the equation display has 90 then pressing sin will display Math.sin(90) directly.
   - Similarly, if the equation display has been evaluated already and the result is shown, pressing the mathematical function key picks up the result key as argument. e.g. if the previous result is 87, pressing x² will display square(87) in the equation field.


3. [help.js](help.js) controls the display of help contents. When help is displayed the calculator display is set to none. When help display is closed by setting to none, the calculator display comes up again.

4. [styles.css](styles.css) contains the styling for the pages and it was probably the most difficult part. For start, I utilised the Bootstrap and tried to use the default boostrap table layout for calc buttons. But some issues were there regarding the hiding/showing of selective buttons and changing even one button position required me to change the whole row buttons. So, I shifted to (and learned) "grid" display instead. Also, I have used the display property for hiding/showing the calc as it retains the layout properly.


I used the following resources extensively for project building:

* [Css-tricks](https://css-tricks.com/)
* [Stack](https://stackoverflow.com/)
* [W3schools](https://www.w3schools.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Youtube](https://www.youtube.com)