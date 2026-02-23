<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Http\Resources\AuthorResource;
use App\Models\Author;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return AuthorResource::collection(Author::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAuthorRequest $request) {
        Author::create($request->validated());
        $authors = Author::all();
        return AuthorResource::collection($authors);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthorRequest $request, Author $author) {
        $author->update($request->validated());
        $authors = Author::all();
        return AuthorResource::collection($authors);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author) {
        try {
            $author->delete();
            return response()->json(['message' => 'Author was deleted successfully']);    
        } catch (QueryException $exception) {
            return response()->json(['message' => 'Author cannot be deleted because they still have books.'], 409);
        }
    }
}
