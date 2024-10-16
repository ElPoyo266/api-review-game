export interface reviewDTO {
    id: number;
    review_text: string;
    rating: number;
    game_id: number;
}

export interface addReviewDTO {
    review_text: string;
    rating: number;
    gameId: number;
}

export interface updateReviewDTO {
    id: number;
    review: string;
    rating: number;
    gameId:number;
}
