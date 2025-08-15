import { INFINITE_DURATION } from "../Effects/BaseEffect.ts";
import { RedRidingHoodPassive } from "../Effects/Effects.ts";
import { TriggerOnGameStart } from "../Interfaces.ts";
import { Player } from "../Player.ts";
import { BASE_MAX_HP, BaseCharacter, CharacterSide, CharacterTags } from "./BaseCharacter.ts";

export class RedRidingHood extends BaseCharacter implements TriggerOnGameStart {
  override name: string = "Red hiding hood";
  override maxHealth: number = BASE_MAX_HP;
  override baseMovementSpeed: number = 2;
  override side: CharacterSide = "village";
  override tags: CharacterTags[] = ["isVillager", "TriggerOnGameStart"];

  OnGameStart(source: Player): void {
    console.log(`Adding ${RedRidingHoodPassive.name} to ${source.name}`)
    source.effects.push(new RedRidingHoodPassive(source, INFINITE_DURATION, source));
  }
}