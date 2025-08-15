import { BaseCharacter } from "./Characters/BaseCharacter.ts";
import { CooldownTimer } from "./CooldownTimer.ts";
import { BaseEffect } from "./Effects/BaseEffect.ts";
import { TriggerOnAttack, TriggerOnDamage } from "./Interfaces.ts";
import { BaseItem } from "./Items/BaseItem.ts";

export class Player {
  id: string;
  name: string = "Player";
  character: BaseCharacter;
  items: BaseItem[];
  health: number;

  cooldowns: CooldownTimer[] = [];
  effects: BaseEffect[] = [];

  constructor(character: BaseCharacter, items: BaseItem[], name?: string) {
    this.id = crypto.randomUUID();
    if (name) this.name = name;
    this.character = character;
    character.player = this;
    this.items = items;
    items.forEach((i) => i.owner = this);
    this.health = character.maxHealth;
  }

  Heal(initialHeal: number) {
    const finalHeal = Math.min(this.character.maxHealth, initialHeal + this.health) - this.health;

    console.log(`${this.name} healed ${finalHeal} health`);

    this.health += finalHeal;
  }

  Attack(target: Player, initialDamage: number) {
    console.log(`${this.name} is attacking ${target.name} for ${initialDamage} damage`);

    const finalDamage = this.ApplyDamageModifierOnAttack(initialDamage, target);

    target.TakingDamage(finalDamage, this);
  }

  TakingDamage(initialDamage: number, source?: Player) {
    console.log(`${this.name} is being damaged by ${source?.name ?? "unknown"} for ${initialDamage} damage`);

    const finalDamage = this.ApplyDamageModifierOnTakingDamage(initialDamage, source);

    console.log(`${this.name} took ${finalDamage} damages`);

    this.health -= finalDamage;
  }

  ApplyDamageModifierOnAttack(initialDamage: number, target: Player): number {
    let finalDamage = initialDamage;

    this.items.filter((item) => item.tags.includes("TriggerOnAttack")).forEach((item) => finalDamage = (item as unknown as TriggerOnAttack).OnAttack(this, target, finalDamage));
    this.effects.filter((effect) => effect.tags.includes("TriggerOnAttack")).forEach((effect) =>
      finalDamage = (effect as unknown as TriggerOnAttack).OnAttack(this, target, finalDamage)
    );

    return finalDamage;
  }

  ApplyDamageModifierOnTakingDamage(initialDamage: number, source?: Player): number {
    let finalDamage = initialDamage;

    this.items.filter((item) => item.tags.includes("TriggerOnDamage")).forEach((item) => finalDamage = (item as unknown as TriggerOnDamage).OnDamage(finalDamage, source));
    this.effects.filter((effect) => effect.tags.includes("TriggerOnDamage")).forEach((effect) =>
      finalDamage = (effect as unknown as TriggerOnDamage).OnDamage(finalDamage, source)
    );

    return finalDamage;
  }

  RemoveEffect(effect: BaseEffect) {
    const index = this.effects.findIndex((e) => e.id === effect.id);

    if (index != -1) {
      this.effects.splice(index, 1);
      console.log(`${this.name} lost ${effect.name} effect`);
    }
  }

  ApplyEffect(effect: BaseEffect) {
    this.effects.push(effect);
  }

  GetEffectById(id: string, source?: Player) {
    return this.effects.find((effect) => effect.id === id && (!source || effect.source === source));
  }

  AddCooldown(cooldown: CooldownTimer) {
    this.cooldowns.push(cooldown);
  }

  RemoveCooldown(cooldown: CooldownTimer) {
    const index = this.cooldowns.findIndex((e) => e.id === cooldown.id);

    if (index != -1) {
      this.cooldowns.splice(index, 1);
      console.log(`${this.name}'s ${cooldown.name} cooldown just ended`);
    }
  }

  IsDead(): boolean {
    return this.health <= 0;
  }

  toString() {
    return `${this.name} (${this.character.name} / ${this.items.map((i) => i.toString()).join(" | ")}) ${this.health}/${this.character.maxHealth}
    Cooldowns: ${this.cooldowns.map((cooldown) => this.items.find((item) => item.id === cooldown.id)?.name + " (" + cooldown.remainingTurn + ")").join(", ")}`;
  }
}
