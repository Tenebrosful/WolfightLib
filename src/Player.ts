import { BaseCharacter } from "./Characters/BaseCharacter.ts";
import { BaseEffect } from "./Effects/BaseEffect.ts";
import { BaseItem } from "./Items/BaseItem.ts";

export class Player {
  id: string;
  character: BaseCharacter;
  items: BaseItem[];
  health: number;

  effets: BaseEffect[] = [];

  constructor(character: BaseCharacter, items: BaseItem[], health: number) {
    this.id = crypto.randomUUID();
    this.character = character;
    this.items = items;
    this.health = health;
  }
}