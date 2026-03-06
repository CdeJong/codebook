<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Book;
use App\Models\Review;

class ReviewController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $reviews = Review::all();
        return ReviewResource::collection($reviews);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewRequest $request) {
        $review = Review::create($request->validated());
        return new ReviewResource($review);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewRequest $request, Review $review) {
        $review->update($request->validated());
        return new ReviewResource($review);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review) {
        $review->delete();
        return response()->json(['message' => 'Review was deleted successfully']);
    }
}
