import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import {addGameDTO, editGameDTO, gameDTO} from "../dto/gameDTO";
import { gameService } from "../services/game.service";
import {reviewDTO} from "../dto/reviewDTO";
import {ReviewService} from "../services/review.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<gameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getGame(id: number): Promise<gameDTO> {
    return gameService.getGame(id);
  }

  @Post("/")
  public async addGame(@Body() requestBody: addGameDTO): Promise<gameDTO> {
    const addedGame = await gameService.addGame(requestBody);
    if (!addedGame) {
      throw new Error("Failed to add game");
    }
    return addedGame;
  }

  @Patch("{id}")
    public async updateGame(@Body() requestBody: editGameDTO): Promise<gameDTO> {
        return gameService.updateGame(requestBody);
    }

  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }
  @Get("{id}/reviews")
  public async getReviewsByGameId(@Path() id: number): Promise<reviewDTO[]> {
    return ReviewService.getReviewsByGameId(id);
  }
}