import { Villager } from "./src/Characters/Characters.ts";
import { Game } from "./src/Game.ts";
import { UsableSelf } from "./src/Items/BaseItem.ts";
import { HealingPotion, WarRobe } from "./src/Items/Items.ts";
import { Player } from "./src/Player.ts";

const game = new Game();

game.players.push(new Player(new Villager(), [new WarRobe(), new HealingPotion(), new WarRobe()], "Player 1"));
game.players.push(new Player(new Villager(), [new WarRobe(), new HealingPotion(), new WarRobe()], "Player 2"));

game.TurnStart();

(game.players[0].items[1] as unknown as UsableSelf).Use();

game.TurnEnd()

game.players[0].Damage(game.players[1], 10);

game.TurnEnd()

game.TurnEnd()
