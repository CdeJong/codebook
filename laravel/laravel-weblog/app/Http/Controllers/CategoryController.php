<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Routing\Controller;

class CategoryController extends Controller {

    use AuthorizesRequests;

    public function __construct() {
        $this->authorizeResource(Category::class, 'category');
    }

    /**
     * Display a listing of the resource.
     */
    public function index() {
        $categories = Category::withCount('posts')->get();
        return view('categories.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return view('categories.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request) {
        Category::create($request->validated());
        return redirect()->route('categories.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category) {
        return view('categories.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category) {
        $category->update($request->validated());
        return redirect()->route('categories.index', $category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category) {
        $category->delete();
        return redirect()->route('categories.index');
    }
}
