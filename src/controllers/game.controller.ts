import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import {AddGame, EditGame, GameDTO} from "../dto/game.dto";
import { gameService } from "../services/game.service";
import {ReviewDTO} from "../dto/review.dto";
import {ReviewService} from "../services/review.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getGame(id: number): Promise<GameDTO> {
    return gameService.getGame(id);
  }

  @Post("/")
  public async addGame(@Body() requestBody: AddGame): Promise<GameDTO> {
    const addedGame = await gameService.addGame(requestBody);
    if (!addedGame) {
      throw new Error("Failed to add game");
    }
    return addedGame;
  }

  @Patch("{id}")
    public async updateGame(@Body() requestBody: EditGame): Promise<GameDTO> {
        return gameService.updateGame(requestBody);
    }

  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }
  @Get("{id}/reviews")
  public async getReviewsByGameId(@Path() id: number): Promise<ReviewDTO[]> {
    return ReviewService.getReviewsByGameId(id);
  }
}