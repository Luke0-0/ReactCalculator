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
    symbols: ["+", "-", "*", "/"],
  };

  calculateEquation = (equation) => {
    if (equation !== "") {
  
      const operators = ["+", "-", "*", "/"];
  
      for (let operator of operators) {
        if (equation.includes(operator)) {
          const equ1 = Number(equation.substring(0, equation.indexOf(operator)));
          const equ2 = Number(equation.substring(equation.indexOf(operator) + 1));
          let result = 0;
  
          switch (operator) {
            case "+":
              result = equ1 + equ2;
              break;
            case "-":
              result = equ1 - equ2;
              break;
            case "*":
              result = equ1 * equ2;
              break;
            case "/":
              result = equ1 / equ2;
              break;
            default:
              return;
          }
  
          this.setState({
            prevDisplayValue: result.toString(),
            displayValue: result.toString(), // perform calculation
            equation: "",
            equalsFlag: true,
          });
          break; // exit loop once the calculation is done
        }
      }
    }
  }

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
        displayValue: this.state.prevDisplayValue.toString() + "*" + value.toString(),
        equation: this.state.prevDisplayValue.toString() + "*" + value.toString(),
        operation: "",
      })
    }

    else {
      // clear the calculator display
      if (value === "C") {
        this.setState ({
          displayValue: "",
          prevDisplayValue: ""
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
        // check if an operation has already been entered. If so, perform a calculation
        if (this.state.symbols.some(symbol => this.state.displayValue.includes(symbol))) {
          this.calculateEquation(this.state.equation)
        }
        else {
          if (!((this.state.prevDisplayValue.toString()).includes("/"))){
            this.setState((prevState) => ({
              prevDisplayValue: prevState.displayValue, // Store current value for division
              displayValue: this.state.prevDisplayValue + "/", // Reset display value for the next number
              operation: "divide", // Set the current operation to division
            }))
          }
        }
        return;
      }

      // Add
      if (value === "+") {
        // check if an operation has already been entered. If so, perform a calculation
        if (this.state.symbols.some(symbol => this.state.displayValue.includes(symbol))) {
        this.calculateEquation(this.state.equation)
        }
        else {
          if (!((this.state.prevDisplayValue.toString()).includes("+"))){
            this.setState((prevState) => ({
              prevDisplayValue: prevState.displayValue, // Store current value 
              displayValue: this.state.prevDisplayValue + "+", // Reset display value for the next number
              operation: "add", // Set the current operation to addition
            }));
          }
        }
        return;
      }

      // Multipy
      if (value === "*") {
        // check if an operation has already been entered. If so, perform a calculation
        if (this.state.symbols.some(symbol => this.state.displayValue.includes(symbol))) {
        this.calculateEquation(this.state.equation)
        }
        else {
          if (!((this.state.prevDisplayValue.toString()).includes("*"))){
            this.setState((prevState) => ({
              prevDisplayValue: prevState.displayValue, // Store current value
              displayValue: this.state.prevDisplayValue + "*", // Reset display value for the next number
              operation: "multiply", // Set the current operation to multiplication
            }));
          }
        }
        return;
      }

      // Subtract
      if (value === "-") {
        // check if an operation has already been entered. If so, perform a calculation
        if (this.state.symbols.some(symbol => this.state.displayValue.includes(symbol))) {
        this.calculateEquation(this.state.equation)
        }
        else {
          if (!((this.state.prevDisplayValue.toString()).includes("-"))){
            this.setState((prevState) => ({
              prevDisplayValue: prevState.displayValue,
              displayValue: this.state.prevDisplayValue + "-", // Reset display value for the next number
              operation: "subtract", // Set the current operation to subtraction
            }));
          }
        }
        return;
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////


      // Calculate result when the user presses '='
      if (value === "=") {
        this.calculateEquation(this.state.equation)
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
              equation: this.state.displayValue + value
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