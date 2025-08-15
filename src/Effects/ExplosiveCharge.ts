import { DiceGenerator } from "../DiceGenerator.ts";
import { BaseEffect, EffectTag, INFINITE_DURATION } from "./BaseEffect.ts";

export const EXPLOSIVE_CHARGE_ID = "EXPLOSIVE_CHARGE";

export class ExplosiveCharge extends BaseEffect {
  override id: string = EXPLOSIVE_CHARGE_ID;
  override name: string = "Explosive charge";
  override tags: EffectTag[] = [];
  override remainingTurn: number = INFINITE_DURATION;

  chargeAmount = 1;

  Explode() {
    const damagePerCharge = DiceGenerator.D6(1) + 1;

    console.log(`Each ${this.source?.name}'s explosive charges on ${this.appliedTo.name} will explode for ${damagePerCharge} damages`);
    return damagePerCharge;
  }
}
