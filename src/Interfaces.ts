import { Player } from "./Player.ts";

export interface UsableSelf {
  Use(): void;
}

export interface UsableTarget {
  UseOnTarget(target: Player): void;
}

export interface TriggerOnDamage {
  /**
   * 
   * @param source Source of the damage
   * @param initialDamage Amount of damage
   * @returns Damage after calculation
   */
  OnDamage(source: Player, initialDamage: number): number;
}

export interface TriggerOnGameStart {
  OnGameStart(source: Player): void;
}