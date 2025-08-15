import { BaseCharacter } from "./Characters/BaseCharacter.ts";
import { CooldownTimer } from "./CooldownTimer.ts";
import { BaseEffect } from "./Effects/BaseEffect.ts";
import { BaseItem, TriggerOnDamage } from "./Items/BaseItem.ts";

export class Player {
  id: string;
  name: string = "Player"
  character: BaseCharacter;
  items: BaseItem[];
  health: number;

  cooldowns: CooldownTimer[] = [];
  effects: BaseEffect[] = [];

  constructor(character: BaseCharacter, items: BaseItem[], name?: string) {
    this.id = crypto.randomUUID();
    if (name) { this.name = name; }
    this.character = character;
    this.items = items;
    items.forEach(i => i.owner = this);
    this.health = character.maxHealth;
  }

  Heal(initialHeal: number) {
    const finalHeal = Math.min(this.character.maxHealth, initialHeal + this.health) - this.health;

    console.log(`${this.name} healed ${finalHeal} health`);

    this.health += finalHeal;
  }

  Damage(source: Player, initialDamage: number) {
    let finalDamage = initialDamage;

    console.log(`${this.name} is being damaged by ${source.name} for ${initialDamage} damage`);

    this.items.filter(item => item.tags.includes("TriggerOnDamage")).forEach(item => finalDamage = (item as unknown as TriggerOnDamage).OnDamage(source, finalDamage));

    console.log(`${this.name} took ${finalDamage} damages`);

    this.health -= finalDamage;
  }

  IsDead(): boolean {
    return this.health <= 0;
  }

  toString() {
    return `${this.name} (${this.character.name} / ${this.items.map(i => i.toString()).join(" | ")}) ${this.health}/${this.character.maxHealth}
    Cooldowns: ${this.cooldowns.map(cooldown => this.items.find(item => item.id === cooldown.id)?.name + " (" + cooldown.remainingTurn + ")").join(", ")}`;
  }
}