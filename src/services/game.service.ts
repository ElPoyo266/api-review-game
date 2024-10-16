import {addGameDTO, editGameDTO, gameDTO} from "../dto/gameDTO";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import {consoleService} from "./console.service";
import {ReviewService} from "./review.service";

export class GameService {
    public async getAllGames(): Promise<gameDTO[]> {
        return Game.findAll({
            include: [
                {
                    model: Console,
                    as: "console",
                },
            ],
        });
    }

    public async getGame(id: number): Promise<gameDTO> {
        const game = await Game.findByPk(id, {
            include: [
                {
                    model: Console,
                    as: "console",
                },
            ],
        });
        if (!game) { //Renvoyer une erreur la game est pas trouvée
            throw new Error(`Game with id ${id} not found`);
        }
        return game;
    }

    public async addGame(game: addGameDTO): Promise<gameDTO | undefined> {
        if (!game.consoleId) throw new Error("Console is required");

        const consoleExists = (await consoleService.getAllConsoles()).some(console => console.id === game.consoleId);
        if (!consoleExists) return undefined;

        return await Game.create({title: game.title, console_id: game.consoleId});
    }

    public async updateGame(game: editGameDTO): Promise<gameDTO> {
        const gameToUpdate = await Game.findByPk(game.id);
        if (!gameToUpdate) throw new Error("Game not found");
        if (game.consoleId != null) {
            const console = await consoleService.getConsoleById(game.consoleId);
            if (!console) throw new Error("Console not found");
            gameToUpdate.console_id = game.consoleId!;
        }
        await gameToUpdate.update({ title: game.title, console_id: game.consoleId });
        return gameToUpdate;
    }

    static async getGamesByConsoleId(id: number) {
        return await Game.findAll({ where: { console_id: id } });
    }

    public async deleteGame(id: number): Promise<void> {
        const reviews = await ReviewService.getReviewsByGameId(id);
        if (reviews.length > 0) {
            throw new Error("Cannot delete game with existing reviews.");
        }
        await Game.destroy({ where: { id } });
    }

}
export const gameService = new GameService();
