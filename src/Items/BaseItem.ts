import { CooldownTimer } from "../CooldownTimer.ts";
import { Player } from "../Player.ts";

export abstract class BaseItem {
  id: string;
  abstract name: string;
  abstract cooldown: number;
  abstract tags: ItemTag[];
  owner?: Player;

  constructor() {
    this.id = crypto.randomUUID();
  }

  StartCooldown() {
    this.owner!.cooldowns.push(new CooldownTimer(this.id, this.cooldown));
  }

  IsOnCooldown() {
    return this.owner!.cooldowns.some(c => c.id === this.id);
  }

  toString() {
    return this.name
  }
}

export type ItemTag =
  "Usable" |
  "TriggerOnDamage" |
  "TriggerOnGameStart" |
  "TargetRequired" |
  "SelfTarget"