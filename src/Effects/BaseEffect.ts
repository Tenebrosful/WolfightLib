import { Player } from "../Player.ts";

export abstract class BaseEffect {
  name: string = "BaseEffect";
  id: string;
  source?: Player;

  constructor() {
    this.id = crypto.randomUUID();
  }
}