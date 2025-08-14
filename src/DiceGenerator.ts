import * as RandomGeneratorLib from "npm:random-seed";
import { RandomSeed } from "npm:random-seed"
import { randomBytes } from "node:crypto";

export class DiceGenerator {
  static #instance: DiceGenerator;

  seed: string;
  randomGenerator: RandomSeed;

  private constructor(seed = randomBytes(256).toString("hex")) {
    this.seed = seed;
    this.randomGenerator = RandomGeneratorLib.default.create(seed);
  }

  private GenerateDiceResult(amount: number, dice: number): number {
    if (amount <= 0 || dice <= 0) { console.warn(`Tried to generate ${amount}d${dice}`); return 0; }
    return this.randomGenerator.intBetween(amount, amount * dice);
  }

  static Initiate(seed?: string) {
    this.#instance = new DiceGenerator(seed);
  }

  static Dice(amount: number, dice: number): number {
    return this.#instance.GenerateDiceResult(amount, dice);
  }

  static D4(amount: number): number {
    return this.Dice(amount, 6);
  }

  static D6(amount: number): number {
    return this.Dice(amount, 6);
  }

  static D20(amount: number): number {
    return this.Dice(amount, 20);
  }

  static D100(amount: number): number {
    return this.Dice(amount, 100);
  }
}