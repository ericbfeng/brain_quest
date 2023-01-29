// This component consists of two buttons that increment / decrement a count.
// It is just meant to show where a component should be defined 'client/src/components'
// and how it can be exported.

// Note that in reality this component should have a style sheet within 'client/src/styles'
// and should also have a test within 'client/src/tests'.

import React, { useState } from "react";

interface Props {
    startingCount: Number;
}

export default function SimpleComponent({startingCount}: Props) {
    const [count, setCount] = useState(startingCount);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          +
        </button>
        <button onClick={() => setCount(count - 1)}>
          -
        </button>
      </div>
    );
  }

