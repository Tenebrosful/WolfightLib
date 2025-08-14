import { BaseCharacter } from "./Characters/BaseCharacter.ts";
import { CooldownTimer } from "./CooldownTimer.ts";
import { BaseEffect } from "./Effects/BaseEffect.ts";
import { BaseItem } from "./Items/BaseItem.ts";

export class Player {
  id: string;
  name: string = "Player"
  character: BaseCharacter;
  items: BaseItem[];
  health: number;

  cooldowns: CooldownTimer[] = [];
  effects: BaseEffect[] = [];

  constructor(character: BaseCharacter, items: BaseItem[],) {
    this.id = crypto.randomUUID();
    this.character = character;
    this.items = items;
    items.forEach(i => i.owner = this);
    this.health = character.maxHealth;
  }

  Heal(amount: number) {
    this.health += Math.min(this.character.maxHealth, amount);
  }

  toString() {
    return `${this.name} (${this.character.name} / ${this.items.map(i => i.toString()).join(" | ")}) ${this.health}/${this.character.maxHealth}
    Cooldowns: ${this.cooldowns.map(cooldown => this.items.find(item => item.id === cooldown.id)?.name + " (" + cooldown.remainingTurn + ")").join(", ")}`;
  }
}