import { Tags } from "../Tags.ts";

export abstract class BaseCharacter {
  name: string = "BaseCharacter";
  movementSpeed: number = 0;
  /**
   * Use for display, to calculate effects use Tags
   */
  side: CharacterSide = "village";
  tags: Tags[] = []
}

export type CharacterSide = "village" | "wolf" | "solo";