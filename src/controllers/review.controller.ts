import {Body, Controller, Delete, Get, Patch, Post, Route, Tags} from "tsoa";
import {addReviewDTO, reviewDTO, updateReviewDTO} from "../dto/reviewDTO";
import {ReviewService} from "../services/review.service";
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
    @Get("{id}")
    public async getReview(id: number): Promise<reviewDTO[]> {
        return ReviewService.getReviews(id);
    }
    @Get("/")
    public async getAllReview(): Promise<reviewDTO[]> {
        return ReviewService.getAllReviews();
    }
    @Post("/")
    public async addReview(@Body() addReviewDTO: addReviewDTO): Promise<reviewDTO> {
        return ReviewService.addReview(addReviewDTO);
    }
    @Patch("/")
    public async updateReview(@Body() updateReviewDTO: updateReviewDTO): Promise<reviewDTO> {
        return ReviewService.updateReview(updateReviewDTO);
    }

    @Delete("{id}")
    public async deleteReview(id: number): Promise<void> {
        return ReviewService.deleteReview(id);
    }
}