import React from "react";
import Display from "./Display.js";
import Keypad from "./Keypad.js";

class Calculator extends React.Component {
  state = {
    displayValue: 0,
    prevDisplayValue: 0,
    output: 0,
  };

  handleClick = (value) => {
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

    // Divde
    if (value === "/") {
      const dividend = Number(this.state.prevDisplayValue);
      const divisor = Number(this.state.displayValue);
      
      console.log("Divisor: ", divisor);
      console.log("Dividend: ",dividend);

      // Ensure dividend is a number
      if (isNaN(dividend)) {
        return; // Exit if dividend is not a number
      }

      if (divisor === 0) {
        // Handle division by zero (optional)
        this.setState ({
          displayValue: "Cannot divide by 0"
        })
        return;
      }

      if (dividend === "+") {
        return;
      }

      else {
        this.setState ({
          displayValue: dividend/divisor
        });
      }
      return;
    }

    // calculate
    else {
      this.setState((prevState) => ({
        displayValue: parseInt(prevState.displayValue.toString() + value.toString()),
        prevDisplayValue: Number(prevState.displayValue.toString() + value.toString()), // Update prevDisplayValue
      }));
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