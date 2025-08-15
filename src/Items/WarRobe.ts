import { DiceGenerator } from "../DiceGenerator.ts";
import { TriggerOnDamage, TriggerOnGameStart } from "../Interfaces.ts";
import { Player } from "../Player.ts";
import { BaseItem, ItemTag } from "./BaseItem.ts";

export class WarRobe extends BaseItem implements TriggerOnDamage, TriggerOnGameStart {
  override name: string = "War Robe";
  override cooldown: number = 0;
  override tags: ItemTag[] = ["TriggerOnDamage", "TriggerOnGameStart"];

  damageReduction: number = 0;

  OnDamage(_source: Player, initialDamage: number): number {
    const finalDamage = Math.max(0, initialDamage - this.damageReduction);

    console.log(`${this.name} reduced damage from ${initialDamage} to ${finalDamage} (${initialDamage - finalDamage})`);

    return finalDamage;
  }

  OnGameStart(_source: Player): void {
    this.damageReduction = DiceGenerator.D6(1);
    console.log(`${this.owner?.name}'s ${this.name} will reduce damage of ${this.damageReduction}`);
  }

  override toString(): string {
    return `${super.toString()} (${this.damageReduction})`;
  }

}