import { CounterService } from "../services/counter";

const service = new CounterService();

export const Counter = () => {
  return (
    <div class="grid gap-8 m-8">
      <div class="text-center">
        <h1 class="text-5xl">The Counter</h1>
      </div>

      <div class="text-center">
        <span class="font-mono text-9xl">{service.value}</span>
      </div>

      <div class="text-center">
        <button class="btn btn-primary" onClick={() => service.increment()}>
          Increment!
        </button>
      </div>
    </div>
  );
};
