import { DiceGenerator } from "../DiceGenerator.ts";
import { TriggerOnAttack } from "../Interfaces.ts";
import { Player } from "../Player.ts";
import { BaseEffect, EffectTag } from "./BaseEffect.ts";

export class GrimoireBonusDamage extends BaseEffect implements TriggerOnAttack {
  override name: string = "Grimoire bonus damage";
  override tags: EffectTag[] = ["TriggerOnAttack"];

  bonusDamage: number;

  constructor(appliedTo: Player, duration?: number, source?: Player) {
    super(appliedTo, duration, source);
    this.bonusDamage = DiceGenerator.D6();

    console.log(`⬆️  ${this.name} will add ${this.bonusDamage} to ${this.appliedTo.name} next attack`);
  }

  OnAttack(_source: Player, _target: Player, initialDamage: number): number {
    const finalDamage = initialDamage + this.bonusDamage;
    console.log(`${this.name} added ${this.bonusDamage} (now ${finalDamage})`);
    this.appliedTo.RemoveEffect(this);
    return finalDamage;
  }
}
