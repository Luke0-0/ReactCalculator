import React from "react";
import Display from "./Display.js";
import Keypad from "./Keypad.js";

class Calculator extends React.Component {
  state = {
    displayValue: "",
    prevDisplayValue: "",
    output: 0,
    operation: "",
    equation: "",
    equalsFlag: false,
  };

  handleClick = (value) => {
    // Handle division
    if (this.state.operation === "divide") {
      this.setState ({
        displayValue: this.state.prevDisplayValue.toString() + "/",
        equation: this.state.displayValue + value.toString(),
        operation: "",
      })
    }

    // Handle addition
    if (this.state.operation === "add") {
      this.setState ({
        displayValue: this.state.prevDisplayValue.toString() + "+",
        equation: this.state.displayValue + value.toString(),
        operation: "",
      })
    }

    // Handle subtraction
    if (this.state.operation === "subtract") {
      this.setState ({
        displayValue: this.state.prevDisplayValue.toString() + "-",
        equation: this.state.displayValue + value.toString(),
        operation: "",
      })
    }

    // Handle multiplication
    if (this.state.operation === "multiply") {
      this.setState ({
        displayValue: this.state.prevDisplayValue.toString() + "*",
        equation: this.state.displayValue + value.toString(),
        operation: "",
      })
    }

    else {
      // clear the calculator display
      if (value === "C") {
        this.setState ({
          displayValue: 0,
          prevDisplayValue: 0
        });
        return;
      }

      // Make a number positive or negative
      if (value === "+-") {
        if (this.displayValue === 0) {
          return;
        }
        else {
          this.setState((prevState) => ({
            displayValue: prevState.displayValue * -1,
            prevDisplayValue: prevState.displayValue, // Update prevDisplayValue
          }))
        }
        return;
      }

      // Divide by 100 and turn into percentage decimal
      if (value === "%") {
        this.setState((prevState) => ({
          displayValue: prevState.displayValue/100,
          prevDisplayValue: prevState.displayValue, // Update prevDisplayValue
        }));
        return;
      }

      if (value === ".") {
        if (!((this.state.prevDisplayValue.toString()).includes("."))) {
          this.setState((prevState) => ({
            displayValue: prevState.displayValue.toString() + ".",
            prevDisplayValue: prevState.displayValue, // Update prevDisplayValue
          }));
        }
        return;
      }

      // Divde
      if (value === "/") {
        if (!((this.state.prevDisplayValue.toString()).includes("/"))){
          this.setState((prevState) => ({
            prevDisplayValue: prevState.displayValue, // Store current value for division
            displayValue: this.state.prevDisplayValue + "/", // Reset display value for the next number
            operation: "divide", // Set the current operation to division
          }))
        }
        return;
      }

      // Add
      if (value === "+") {
        if (!((this.state.prevDisplayValue.toString()).includes("+"))){
          this.setState((prevState) => ({
            prevDisplayValue: prevState.displayValue, // Store current value 
            displayValue: this.state.prevDisplayValue + "+", // Reset display value for the next number
            operation: "add", // Set the current operation to addition
          }));
        }
        return;
      }

      // Multipy
      if (value === "*") {
        console.log("prev: " + this.state.prevDisplayValue)
        if (!((this.state.prevDisplayValue.toString()).includes("*"))){
          this.setState((prevState) => ({
            prevDisplayValue: prevState.displayValue, // Store current value
            displayValue: this.state.prevDisplayValue + "*", // Reset display value for the next number
            operation: "multiply", // Set the current operation to multiplication
          }));
        }
        return;
      }

      // Subtract
      if (value === "-") {
        if (!((this.state.prevDisplayValue.toString()).includes("-"))){
          this.setState((prevState) => ({
            prevDisplayValue: prevState.displayValue,
            displayValue: this.state.prevDisplayValue + "-", // Reset display value for the next number
            operation: "subtract", // Set the current operation to subtraction
          }));
        }
        return;
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////


      // Calculate result when the user presses '='
      if (value === "=") {
        if (this.state.equation !== "") {

          // Calculate division
          if (this.state.equation.toString().includes("/")) {
            const equ1 = Number((this.state.equation).substring(0, (this.state.equation).indexOf("/")))
            const equ2 = Number((this.state.equation).substring((this.state.equation).indexOf("/")+1))
            this.setState ({
              prevDisplayValue: equ1/equ2, 
              displayValue: equ1/equ2, // perform calculation
              equation:  "",
              equalsFlag: true,
            });
          }

          // Calculate addition
          if (this.state.equation.toString().includes("+")) {
            const equ1 = Number((this.state.equation).substring(0, (this.state.equation).indexOf("+")))
            const equ2 = Number((this.state.equation).substring((this.state.equation).indexOf("+")+1))
            this.setState ({
              prevDisplayValue: equ1 + equ2, 
              displayValue: equ1 + equ2, // perform calculation
              equation:  "",
              equalsFlag: true,
            });
          }

          // Calculate subtraction
          if (this.state.equation.toString().includes("-")) {
            const equ1 = Number((this.state.equation).substring(0, (this.state.equation).indexOf("-")))
            const equ2 = Number((this.state.equation).substring((this.state.equation).indexOf("-")+1))
            this.setState ({
              prevDisplayValue: equ1 - equ2, 
              displayValue: equ1 - equ2, // perform calculation
              equation:  "",
              equalsFlag: true,
            });
          }

          // Calculate multiplication
          if (this.state.equation.toString().includes("*")) {
            const equ1 = Number((this.state.equation).substring(0, (this.state.equation).indexOf("*")))
            const equ2 = Number((this.state.equation).substring((this.state.equation).indexOf("*")+1))
            this.setState({
              prevDisplayValue: equ1 * equ2, 
              displayValue: equ1 * equ2, // perform calculation
              equation:  "",
              equalsFlag: true,
            });
          }
        }
        return;
      }

      // calculate
      else {
        console.log("Equation: " + this.state.equation)
        console.log("prevValue: " + this.state.prevDisplayValue)
        if (Number(this.state.prevDisplayValue) === 0 || this.state.equalsFlag) {
          this.setState ({
            displayValue: value.toString(),
            prevDisplayValue: value.toString(), // Update prevDisplayValue
            equalsFlag: false,
          });
        }
        else {
          if ((this.state.equation).includes("/") || (this.state.equation).includes("*") || this.state.equation.includes("+") || this.state.equation.includes("-")) {
            this.setState ({
              equation: this.state.equation + value
            });
          }
          this.setState(prevState => ({
            displayValue: prevState.displayValue.toString() + value.toString(),
            prevDisplayValue: prevState.displayValue.toString() + value.toString(), // Update prevDisplayValue
          }));
        }
      }
    }
  };

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Keypad onClick={this.handleClick} />
      </div>
    );
  }
}

export default Calculator;