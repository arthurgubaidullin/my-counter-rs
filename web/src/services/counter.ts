import { signal, type ReadonlySignal, type Signal } from "@preact/signals";

export class CounterService {
  #value: Signal<number>;

  constructor() {
    this.#value = signal(0);

    this.update();
  }

  public async increment() {
    const response = await fetch("/counter", {
      method: "POST",
    });

    const value: number = await response.json();

    this.#value.value = value;
  }

  public get value(): ReadonlySignal<number> {
    return this.#value;
  }

  private async update() {
    const response = await fetch("/counter");

    const value: number = await response.json();

    this.#value.value = value;
  }
}
