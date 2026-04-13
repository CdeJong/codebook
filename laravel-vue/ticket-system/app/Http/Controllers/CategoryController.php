<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Http\Exceptions\HttpResponseException;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : ResourceCollection {
        $categories = Category::all();
        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request) : JsonResource {
        $this->requiresAdmin();
        $category = Category::create($request->validated());
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category) : JsonResource {
        $this->requiresAdmin();
        $category->update($request->validated());
        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category) : JsonResponse {
        $this->requiresAdmin();

        if ($category->tickets()->exists()) {
            throw new HttpResponseException(response()->json([
                'message' => 'Category cannot be deleted because they are still being used by tickets.',
                'errors' => []
            ], 422));    
        }

        $category->delete();
        return response()->json(['message' => 'resource was deleted successfully']); 
    }
}
