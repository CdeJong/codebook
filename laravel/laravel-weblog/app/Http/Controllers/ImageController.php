<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController {
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

}
