import { TriggerOnGameStart } from "../Interfaces.ts";
import { Player } from "../Player.ts";
import { BASE_MAX_HP, BaseCharacter, CharacterSide, CharacterTags } from "./BaseCharacter.ts";

export class Heir extends BaseCharacter implements TriggerOnGameStart {
  override name: string = "Heir";
  override maxHealth: number = BASE_MAX_HP;
  override baseMovementSpeed: number = 0;
  override side: CharacterSide = "village";
  override tags: CharacterTags[] = ["TriggerOnGameStart", "isVillager"];

  OnGameStart(_source: Player): void {
    throw new Error("Method not implemented.");
  }
}
