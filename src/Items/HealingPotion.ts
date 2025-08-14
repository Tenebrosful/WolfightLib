import { DiceGenerator } from "../DiceGenerator.ts";
import { BaseItem, ItemTag, UsableSelf } from "./BaseItem.ts";

export class HealingPotion extends BaseItem implements UsableSelf {
  override name: string = "Healing Potion";
  override cooldown: number = 3;
  override tags: ItemTag[] = ["Usable", "SelfTarget"];

  Use(): void {
    this.owner!.Heal(DiceGenerator.D6(1));
    this.StartCooldown();
  }
}