import { DiceGenerator } from "../DiceGenerator.ts";
import { Player } from "../Player.ts";
import { BaseItem, ItemTag, TriggerOnDamage } from "./BaseItem.ts";

export class WarRobe extends BaseItem implements TriggerOnDamage {
  override name: string = "War Robe";
  override cooldown: number = 0;
  override tags: ItemTag[] = ["TriggerOnDamage"];

  damageReduction: number;

  constructor() {
    super()
    this.damageReduction = DiceGenerator.D6(1);
  }

  OnDamage(_source: Player, damage: number): number {
    return Math.max(0, damage - this.damageReduction);
  }

  override toString(): string {
    return `${super.toString()} (${this.damageReduction})`;
  }

}