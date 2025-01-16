import { useEffect, useState } from "react";

export default function App() {
  // useState is a function in react that returns an array
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  // Destructuring [value of the state, setter function used to update the piece of state]

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  // When page is reloaded, automatically display the 1st advice
  useEffect(function () {
    getAdvice();
  }, []);
  // 1st argument: a function that we want to execute in the beginning
  // 2nd argument: dependency array

  return (
    // JSX code: similar to HTML but JavaScript can be added to it using {}
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get advice</button>
      <Message count={count - 1} />
      {/* PROPS: count={count} since cannot do Message(count){} like a normal
      function */}
    </div>
  );
}

// Creating seperate Components
function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}
