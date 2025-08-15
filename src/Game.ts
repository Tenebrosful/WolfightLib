import { DiceGenerator } from "./DiceGenerator.ts";
import { TriggerOnGameStart } from "./Interfaces.ts";
import { Player } from "./Player.ts";

export class Game {
  turnNumber: number = 0;
  currentPhase: gamePhase = gamePhase.initialization;
  players: Player[] = [];

  constructor(seed?: string) {
    DiceGenerator.Initiate(seed);
  }

  GameStart() {
    console.log(`> Game Starting`);
    this.players.forEach((player) => {
      if (player.character.tags.includes("TriggerOnGameStart")) (player.character as unknown as TriggerOnGameStart).OnGameStart(player);
      player.items.filter((item) => item.tags.includes("TriggerOnGameStart")).forEach((item) => (item as unknown as TriggerOnGameStart).OnGameStart(player));
    });
  }

  TurnStart() {
    this.currentPhase = gamePhase.turnStart;
    this.turnNumber++;
    console.log(`> Start of turn ${this.turnNumber}`);

    this.DuringTurn();
  }

  DuringTurn() {
    this.currentPhase = gamePhase.ingoing;
    console.log(`> Player phase turn`);
  }

  TurnEnd() {
    this.currentPhase = gamePhase.turnEnd;
    console.log(`> End of turn ${this.turnNumber}`);

    this.players
      .forEach((player) =>
        player.cooldowns
          .forEach((cooldown) => {
            cooldown.Tick();
          })
      );

    this.TurnStart();
  }

  toString() {
    return `Players:\r\n- ${this.players.map((p) => p.toString()).join("\r\n- ")}`;
  }
}

export enum gamePhase {
  initialization,
  gameStart,
  turnStart,
  ingoing,
  turnEnd,
  gameEnd,
}
