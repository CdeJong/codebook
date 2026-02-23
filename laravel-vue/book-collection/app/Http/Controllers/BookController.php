<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
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
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request) {
        $book = Book::create($request->validated());


        $books = Book::all();
        return BookResource::collection($books);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
