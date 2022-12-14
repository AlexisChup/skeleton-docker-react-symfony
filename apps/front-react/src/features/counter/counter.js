import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice.js";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="col">
      <div className="row justify-center align-content-center">
        <div className="col">
          <h2>Test Redux</h2>
        </div>
      </div>
      <div>
        <button
          className="btn btn-primary btn-sm"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className="mx-3">{count}</span>
        <button
          className="btn btn-primary btn-sm"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
