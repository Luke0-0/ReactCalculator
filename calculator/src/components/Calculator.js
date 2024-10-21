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

  calculateEquation = (equation, symbol="") => {
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
            displayValue: result.toString() + symbol, // perform calculation
            equation: "",
          });
          if (symbol==="") {
            this.setState({
              equalsFlag: true,
            });
          }
          break; // exit loop once the calculation is done
        }
      }
    }
  }

  handleClick = (value) => {
    // Handle division
    if (this.state.operation === "divide") {
      // Check if the last value entered was an operation, if so, change the current operation to that operation
      if (this.state.symbols.some(symbol => (this.state.displayValue.toString().charAt(this.state.displayValue.toString().length-1)===symbol))) {
        this.setState((prevState) => ({
            displayValue: this.state.prevDisplayValue + value.toString(), // Reset display value for the next number
            prevDisplayValue: prevState.displayValue,
            operation: "subtract", // Set the current operation to subtraction
            equalsFlag: false,
          }));
      }
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
          prevDisplayValue: "",
          equalsFlag: false,
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
            equalsFlag: false,
          }))
        }
        return;
      }

      // Divide by 100 and turn into percentage decimal
      if (value === "%") {
        this.setState((prevState) => ({
          displayValue: prevState.displayValue/100,
          prevDisplayValue: prevState.displayValue, // Update prevDisplayValue
          equalsFlag: false,
        }));
        return;
      }

      if (value === ".") {
        this.setState((prevState) => ({
          displayValue: prevState.displayValue.toString() + ".",
          prevDisplayValue: prevState.displayValue, // Update prevDisplayValue
          equalsFlag: false,
        }));
        return;
      }

      // Divde
      if (value === "/") {
        // check if an operation has already been entered. If so, perform a calculation
        if (this.state.symbols.some(symbol => this.state.displayValue.toString().includes(symbol))) {
          this.calculateEquation(this.state.equation, "/")
        }
        else {
          if (!((this.state.prevDisplayValue.toString()).includes("/"))){
            this.setState((prevState) => ({
              prevDisplayValue: prevState.displayValue, // Store current value for division
              displayValue: this.state.prevDisplayValue + "/", // Reset display value for the next number
              operation: "divide", // Set the current operation to division
              equalsFlag: false,
            }))
          }
        }
        return;
      }

      // Add
      if (value === "+") {
        console.log("AddDisplayVal: " + this.state.displayValue)
        // check if an operation has already been entered. If so, perform a calculation
        if (this.state.symbols.some(symbol => this.state.displayValue.toString().includes(symbol))) {
        this.calculateEquation(this.state.equation, "+")
        }
        else {
          if (!((this.state.prevDisplayValue.toString()).includes("+"))){
            this.setState((prevState) => ({
              prevDisplayValue: prevState.displayValue, // Store current value 
              displayValue: this.state.displayValue + "+", // Reset display value for the next number
              operation: "add", // Set the current operation to addition
              equalsFlag: false,
            }));
          }
        }
        return;
      }

      // Multipy
      if (value === "*") {
        // check if an operation has already been entered. If so, perform a calculation
        if (this.state.symbols.some(symbol => this.state.displayValue.toString().includes(symbol))) {
        this.calculateEquation(this.state.equation, "*")
        }
        else {
          if (!((this.state.prevDisplayValue.toString()).includes("*"))){
            this.setState((prevState) => ({
              prevDisplayValue: prevState.displayValue, // Store current value
              displayValue: this.state.prevDisplayValue + "*", // Reset display value for the next number
              operation: "multiply", // Set the current operation to multiplication
              equalsFlag: false,
            }));
          }
        }
        return;
      }

      // Subtract
      if (value === "-") {
        // check if an operation has already been entered. If so, perform a calculation
        if (this.state.symbols.some(symbol => (this.state.displayValue.toString().substring(1)).includes(symbol))) {
          this.calculateEquation(this.state.equation, "-")
        }
        else {
          if (!((this.state.prevDisplayValue.toString().substring(1)).includes("-"))){
            this.setState((prevState) => ({
              prevDisplayValue: prevState.displayValue,
              displayValue: this.state.prevDisplayValue + "-", // Reset display value for the next number
              operation: "subtract", // Set the current operation to subtraction
              equalsFlag: false,
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

      // handle the input value if it is just an integer and not a special operation
      else {
        if ((Number(this.state.prevDisplayValue) === 0 && !this.state.displayValue.toString().includes(".")) || this.state.equalsFlag) { // check if previous value is 0, and if so delete the zero
          this.setState ({
            displayValue: value.toString(),
            prevDisplayValue: value.toString(), // Update prevDisplayValue
            equalsFlag: false,
          });
        }
        else { // if the previous input was an operation symbol, then handle accordingly
          if (this.state.symbols.some(symbol => this.state.displayValue.toString().includes(symbol))) {
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
    const titleStyle = {
      color: 'rgb(237, 34, 34)',
      marginBottom: '2.5rem',
      fontSize: "20px",
      textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)'
    }
    return (
      <div>
        <div classname="title" style={titleStyle}>
          <h1>Incredibly Original Calculator</h1>
          </div>

        <div className="calculator">
          <Display value={this.state.displayValue} />
          <Keypad onClick={this.handleClick} />
        </div>
      </div>
    );
  }

}

export default Calculator;