import { BASE_MAX_HP, BaseCharacter, CharacterSide, CharacterTags } from "./BaseCharacter.ts";

export class Villager extends BaseCharacter {
  override name: string = "Villager";
  override maxHealth: number = BASE_MAX_HP;
  override baseMovementSpeed: number = 0;
  override side: CharacterSide = "village";
  override tags: CharacterTags[] = ["isVillager"];
}
