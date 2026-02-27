<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use Illuminate\Http\Request;
use App\Http\Resources\BookResource;
use App\Models\Book;

class BookController extends Controller {

    /**
     * Display a listing of the resource.
     */
    public function index() {
        return BookResource::collection(Book::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request) {
        $book = Book::create($request->validated());
        return new BookResource($book);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book) {
        $book->update($request->validated());
        return new BookResource($book);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book) {
        $book->delete();
        return response()->json(['message' => 'Book was deleted successfully']);
    }
}
