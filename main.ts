import { Pyromancer, RedRidingHood } from "./src/Characters/Characters.ts";
import { Game } from "./src/Game.ts";
import { UsableSelf, UsableTarget } from "./src/Interfaces.ts";
import { Grimoire, HealingPotion, WarRobe } from "./src/Items/Items.ts";
import { Player } from "./src/Player.ts";

const game = new Game();

game.players.push(new Player(new RedRidingHood(), [new WarRobe(), new HealingPotion()], "Player 1"));
// game.players.push(new Player(new Villager(), [new WarRobe(), new HealingPotion()], "Player 2"));
game.players.push(new Player(new Pyromancer(), [new WarRobe(), new HealingPotion(), new Grimoire()], "Player 2"));

game.GameStart();

game.TurnStart();

(game.players[0].items[1] as unknown as UsableSelf).Use();
(game.players[1].character as unknown as UsableTarget).UseOnTarget(game.players[0]);

game.TurnEnd();

(game.players[1].character as unknown as UsableTarget).UseOnTarget(game.players[0]);
game.players[0].Attack(game.players[1], 10);

game.TurnEnd();

(game.players[1].character as unknown as UsableTarget).UseOnTarget(game.players[0]);

game.TurnEnd();

(game.players[1].items[2] as unknown as UsableSelf).Use();

game.TurnEnd();

(game.players[1].character as unknown as UsableSelf).Use(game.players);

// console.log(game);
