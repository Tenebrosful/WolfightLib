import { INFINITE_DURATION } from "../Effects/BaseEffect.ts";
import { EXPLOSIVE_CHARGE_ID, ExplosiveCharge } from "../Effects/ExplosiveCharge.ts";
import { UsableSelf, UsableTarget } from "../Interfaces.ts";
import { Player } from "../Player.ts";
import { BASE_MAX_HP, BaseCharacter, CharacterSide, CharacterTags } from "./BaseCharacter.ts";

export class Pyromancer extends BaseCharacter implements UsableTarget, UsableSelf {
  override name: string = "Pyromancer";
  override maxHealth: number = BASE_MAX_HP;
  override baseMovementSpeed: number = 2;
  override side: CharacterSide = "village";
  override tags: CharacterTags[] = ["isVillager"];

  UseOnTarget(target: Player): void {
    const effect = target.GetEffectById(EXPLOSIVE_CHARGE_ID, this.player) as ExplosiveCharge | null | undefined;

    if (effect) effect.chargeAmount++;
    else target.ApplyEffect(new ExplosiveCharge(target, INFINITE_DURATION, this.player));

    console.log(`💣 ${this.player?.name} placed an explosive charge on ${target.name} (${effect?.chargeAmount ?? 1})`);
  }

  /**
   * @param args
   */
  Use(targets: Player[]): void {
    targets.forEach((target) => {
      const effect = target.GetEffectById(EXPLOSIVE_CHARGE_ID, this.player) as ExplosiveCharge;

      if (!effect) return;

      console.log(`💥 ${this.player?.name} is exploding ${effect.chargeAmount} charges on ${target.name}`);

      let damagePerCharge = effect.Explode();
      damagePerCharge = this.player?.ApplyDamageModifierOnAttack(damagePerCharge, target) ?? damagePerCharge;

      target.TakingDamage(damagePerCharge * effect.chargeAmount, this.player);

      target.RemoveEffect(effect);
    });
  }
}
