import { Villager } from "./src/Characters/Characters.ts";
import { Game } from "./src/Game.ts";
import { UsableSelf } from "./src/Items/BaseItem.ts";
import { HealingPotion, WarRobe } from "./src/Items/Items.ts";
import { Player } from "./src/Player.ts";

const game = new Game();

game.players.push(new Player(new Villager(), [new WarRobe(), new HealingPotion(), new WarRobe()]));
game.players.push(new Player(new Villager(), [new WarRobe(), new HealingPotion(), new WarRobe()]));

console.log(game.toString());

(game.players[0].items[1] as unknown as UsableSelf).Use();

console.log(game.toString())

game.TurnEnd()

console.log(game.toString())

game.TurnEnd()

console.log(game.toString())

game.TurnEnd()

console.log(game.toString())
