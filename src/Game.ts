import { DiceGenerator } from "./DiceGenerator.ts";
import { Player } from "./Player.ts";

export class Game {
  turnNumber: number = 0;
  players: Player[] = []

  constructor(seed?: string) {
    DiceGenerator.Initiate(seed);
  }

  TurnEnd() {
    this.players
      .forEach(player => player.cooldowns
        .forEach((cooldown, index, array) => {
          if (cooldown.Tick()) { array.splice(index, 1); }
        }))
    this.turnNumber++;
  }

  toString() {
    return `Players:\r\n- ${this.players.map(p => p.toString()).join("\r\n- ")}`;
  }
}

export enum gamePhase {
  gameStart,
  turnStart,
  ingoing,
  turnEnd,
  gameEnd,
}