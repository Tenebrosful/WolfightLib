import { Player } from "../Player.ts";

export const INFINITE_DURATION = -1;

export abstract class BaseEffect {
  abstract name: string;
  id: string;
  source?: Player;
  appliedTo: Player;
  /**
   * Duration of the effect, -1 mean infinite
   */
  remainingTurn: number;
  abstract tags: EffectTag[];

  constructor(appliedTo: Player, duration?: number, source?: Player) {
    this.id = crypto.randomUUID();
    this.source = source;
    this.appliedTo = appliedTo;
    this.remainingTurn = duration ?? -1;
  }

  /**
   * Tick the duration of the effect
   * @returns True if the effect has ended and has been removed
   */
  Tick(): boolean {
    if (this.remainingTurn === -1) return false;

    const hasEnded = this.remainingTurn-- <= 0;

    if (hasEnded) this.appliedTo.RemoveEffect(this);

    return hasEnded;
  }
}

export type EffectTag =
  | "TriggerOnDamage"
  | "TriggerOnTurnStart"
  | "TriggerOnTurnEnd"
  | "TriggerOnAttack";
