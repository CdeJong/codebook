<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Http\Resources\AuthorResource;
use App\Models\Author;
use Illuminate\Http\Exceptions\HttpResponseException;

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
        $author = Author::create($request->validated());
        return new AuthorResource($author);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAuthorRequest $request, Author $author) {
        $author->update($request->validated());
        return new AuthorResource($author);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author) {

        if ($author->books()->exists()) {
            throw new HttpResponseException(response()->json([
                'message' => 'Author cannot be deleted because they still have books.',
                'errors' => []
            ], 422));    
        }

        $author->delete();
        // return response()->json(['message' => 'Author was deleted successfully']);    
    }
}
