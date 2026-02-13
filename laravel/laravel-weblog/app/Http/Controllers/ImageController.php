<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        // unused
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        // post.create
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // unused?
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image, string $filename) {
        if ($image->filename !== $filename) {
            abort(404);
        }

        $file_path = $image->public_id;
        // uses a wrapper with __call
        /** @var League\Flysystem\FilesystemOperator $file_system */
        $file_system = Storage::disk('private');

        if (!$file_system->exists($file_path)) {
            abort(404);
        }

        $file_content = $file_system->get($file_path);
        $file_mime = $file_system->mimeType($file_path);

        // $mime = $file_system->mime
        return response($file_content, 200)->header('Content-Type', $file_mime);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        // post.edit
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        // unused?
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // unused
    }
}
