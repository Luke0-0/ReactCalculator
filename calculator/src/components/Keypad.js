import React from "react";

class Keypad extends React.Component {
  render() {
    return (
      <div className="keypad">
        {/* keypad buttons */}
        <button>1</button>
        <button>2</button>
        <button>3</button>
        {/* and so on */}
      </div>
    );
  }
}

export default Keypad;