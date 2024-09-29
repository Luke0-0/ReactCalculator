import React from "react";
import Display from "./Display";
import Keypad from "./Keypad";

class Calculator extends React.Component {
  render() {
    return (
      <div className="calculator">
        <Display />
        <Keypad />
      </div>
    );
  }
}

export default Calculator;