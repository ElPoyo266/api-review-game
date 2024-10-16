import {addReviewDTO, reviewDTO, updateReviewDTO} from "../dto/reviewDTO";
import {Review} from "../models/review.model";
export class ReviewService {
    public static async getReviews(id: number): Promise<reviewDTO[]> {
        return await Review.findAll({ where: { id: id } });
    }
    public static async getAllReviews(): Promise<reviewDTO[]> {
        return await Review.findAll();
    }

    public static async addReview(addReviewDTO: addReviewDTO): Promise<reviewDTO> {
        if(addReviewDTO.rating <0 || addReviewDTO.rating > 11) {
            throw  new Error("Rating must be between 0 and 10");
        }
        if (!addReviewDTO.review_text) {
            throw new Error("Review text cannot be null or empty");
        }

        const review = await Review.create({
            review_text: addReviewDTO.review_text,
            rating: addReviewDTO.rating,
            game_id: addReviewDTO.gameId
        });

        return {
            id: review.id,
            review_text: review.review_text,
            rating: review.rating,
            game_id: review.game_id
        };
    }
    public static async updateReview(updateReviewDTO: updateReviewDTO): Promise<reviewDTO> {
        if(updateReviewDTO.rating <0 || updateReviewDTO.rating > 11) {
            throw  new Error("Rating must be between 0 and 10");
        }
        const review = await Review.findByPk(updateReviewDTO.id);
        if (!review) {
            throw new Error("Review not found");
        }

        review.review_text = updateReviewDTO.review;
        review.rating = updateReviewDTO.rating;
        review.game_id = updateReviewDTO.gameId;

        await review.save();

        return {
            id: review.id,
            review_text: review.review_text,
            rating: review.rating,
            game_id: review.game_id
        };
    }

    static async getReviewsByGameId(id: number) {
        return await Review.findAll({ where: { game_id: id } });

    }

    public static async deleteReview(id: number): Promise<void> {
    const review = await Review.findByPk(id);
    if (!review) {
        throw new Error("Review not found");
    }
    await review.destroy();
}
}