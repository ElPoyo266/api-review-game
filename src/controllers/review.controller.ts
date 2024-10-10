import {Body, Controller, Delete, Get, Patch, Post, Route, Tags} from "tsoa";
import {AddReviewDTO, ReviewDTO, UpdateReviewDTO} from "../dto/review.dto";
import {ReviewService} from "../services/review.service";
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
    @Get("{id}")
    public async getReview(id: number): Promise<ReviewDTO[]> {
        return ReviewService.getReviews(id);
    }
    @Get("/")
    public async getAllReview(): Promise<ReviewDTO[]> {
        return ReviewService.getAllReviews();
    }
    @Post("/")
    public async addReview(@Body() addReviewDTO: AddReviewDTO): Promise<ReviewDTO> {
        return ReviewService.addReview(addReviewDTO);
    }
    @Patch("/")
    public async updateReview(@Body() updateReviewDTO: UpdateReviewDTO): Promise<ReviewDTO> {
        return ReviewService.updateReview(updateReviewDTO);
    }

    @Delete("{id}")
    public async deleteReview(id: number): Promise<void> {
        return ReviewService.deleteReview(id);
    }
}