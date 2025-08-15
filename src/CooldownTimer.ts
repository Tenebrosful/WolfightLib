import { Player } from "./Player.ts";

export class CooldownTimer {
  id: string;
  name: string;
  appliedTo: Player;
  remainingTurn: number;

  constructor(id: string, name: string, remainingTurn: number, appliedTo: Player) {
    this.id = id;
    this.name = name;
    this.remainingTurn = remainingTurn;
    this.appliedTo = appliedTo;
    console.log(`${name} (${this.appliedTo.name}) is now in cooldown for ${remainingTurn} turns`);
  }

  /**
   * @returns Return true if the cooldown has ended
   */
  Tick(): boolean {
    const hasEnded = this.remainingTurn-- <= 0;

    if (hasEnded) this.appliedTo.RemoveCooldown(this);

    return hasEnded;
  }
}
