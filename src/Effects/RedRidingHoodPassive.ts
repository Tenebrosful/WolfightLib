import { TriggerOnDamage } from "../Interfaces.ts";
import { Player } from "../Player.ts";
import { BaseEffect, EffectTag, INFINITE_DURATION } from "./BaseEffect.ts";

export class RedRidingHoodPassive extends BaseEffect implements TriggerOnDamage {
  override name: string = "Red riding hood passive protection";
  override tags: EffectTag[] = ["TriggerOnDamage"];
  override remainingTurn: number = INFINITE_DURATION;

  OnDamage(initialDamage: number, source?: Player): number {
    let finalDamage = initialDamage;
    const damageReduction = source?.character.tags.includes("isWolf") ? 2 : 1;

    finalDamage = Math.max(0, initialDamage - damageReduction);

    console.log(`${this.name} reduced damage from ${initialDamage} to ${finalDamage} (${finalDamage - initialDamage})`);

    return finalDamage;
  }
}
