export class CooldownTimer {
  id: string;
  remainingTurn: number;

  constructor(id: string, remainingTurn: number) {
    this.id = id;
    this.remainingTurn = remainingTurn;
    console.log(`${id} is now in cooldown for ${remainingTurn} turns`);
  }

  /**
   * 
   * @returns Return true if the cooldown has ended
   */
  Tick(): boolean {
    return --this.remainingTurn <= 0;
  }
}