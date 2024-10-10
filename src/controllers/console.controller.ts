import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { consoleService } from "../services/console.service";
import { ConsoleDTO } from "../dto/console.dto";
import {notFound} from "../error/NotFoundError";
import {GameService} from "../services/game.service";
import {ReviewService} from "../services/review.service";
import {GameDTO} from "../dto/game.dto";

@Route("consoles")
@Tags("Consoles")
export class ConsoleController extends Controller {
  // Récupère toutes les consoles
  @Get("/")
  public async getAllConsole(): Promise<ConsoleDTO[]> {
    return consoleService.getAllConsoles();
  }

  // Récupère une console par ID
  @Get("{id}")
  public async getConsoleById(@Path() id: number): Promise<ConsoleDTO> {
    const console = await consoleService.getConsoleById(id);
    if (!console) {
      notFound("Console");
    }
    return console;
  }

  // Crée une nouvelle console
  @Post("/")
  public async createConsole(
    @Body() requestBody: ConsoleDTO
  ): Promise<ConsoleDTO> {
    const { name, manufacturer } = requestBody;
    return consoleService.createConsole(name, manufacturer);
  }

  // Supprime une console par ID
  @Delete("{id}")
  public async deleteConsole(@Path() id: number): Promise<void> {
    const games = await GameService.getGamesByConsoleId(id);
    for (const game of games) {
      const reviews = await ReviewService.getReviewsByGameId(game.id);
      if (reviews.length > 0) {
        throw new Error("Cannot delete console with existing reviews for its games.");
      }
    }
    await consoleService.deleteConsole(id);
  }
  @Get("{id}/games")
  public async getGamesByConsoleId(@Path() id: number): Promise<GameDTO[]> {
    return GameService.getGamesByConsoleId(id);
  }

  // Met à jour une console par ID
  @Patch("{id}")
  public async updateConsole(
    @Path() id: number,
    @Body() requestBody: ConsoleDTO
  ): Promise<ConsoleDTO | null> {
    const { name, manufacturer } = requestBody;
    return consoleService.updateConsole(id, name, manufacturer);
  }
}