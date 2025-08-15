import { INFINITE_DURATION } from "../Effects/BaseEffect.ts";
import { GrimoireBonusDamage } from "../Effects/Effects.ts";
import { UsableSelf } from "../Interfaces.ts";
import { BaseItem, ItemTag } from "./BaseItem.ts";

export class Grimoire extends BaseItem implements UsableSelf {
  override name: string = "Grimoire";
  override cooldown: number = 4;
  override tags: ItemTag[] = ["Usable", "SelfTarget"];

  Use(): void {
    this.owner?.ApplyEffect(new GrimoireBonusDamage(this.owner, INFINITE_DURATION, this.owner));
    this.StartCooldown();
  }
}
