export interface ReviewDTO {
    id: number;
    review_text: string;
    rating: number;
    game_id: number;
}

export interface AddReviewDTO {
    review_text: string;
    rating: number;
    gameId: number;
}

export interface UpdateReviewDTO {
    id: number;
    review: string;
    rating: number;
    gameId:number;
}
