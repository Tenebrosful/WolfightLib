import { Player } from "../Player.ts";

export const BASE_MAX_HP = 50;

export abstract class BaseCharacter {
  abstract name: string;
  abstract maxHealth: number;
  abstract baseMovementSpeed: number;
  /**
   * Use for display, to calculate effects use Tags
   */
  abstract side: CharacterSide;
  abstract tags: CharacterTags[];
  player?: Player;
}

export type CharacterSide = "village" | "wolf" | "solo";

export type CharacterTags =
  | "isWolf"
  | "isVillager"
  | "isSolo"
  | "TriggerOnGameStart"
  | "UsableSelf"
  | "UsableOnTarget";
