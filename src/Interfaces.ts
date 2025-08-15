import { Player } from "./Player.ts";

export interface UsableSelf {
  Use(args?: unknown[]): void;
}

export interface UsableTarget {
  UseOnTarget(target: Player, args?: unknown[]): void;
}

export interface TriggerOnDamage {
  /**
   * @param source Source of the damage
   * @param initialDamage Amount of damage
   * @returns Damage after calculation
   */
  OnDamage(initialDamage: number, source?: Player): number;
}

export interface TriggerOnGameStart {
  OnGameStart(source: Player, args?: unknown[]): void;
}

export interface TriggerOnAttack {
  OnAttack(source: Player, target: Player, initialDamage: number): number;
}
