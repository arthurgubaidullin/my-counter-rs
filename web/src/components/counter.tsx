import { useState } from "preact/hooks";
import { CounterService } from "../services/counter";

const service = new CounterService();

export const Counter = () => {
  return (
    <div>
      <p>{service.value}</p>

      <button onClick={() => service.increment()}>Increment!</button>
    </div>
  );
};
