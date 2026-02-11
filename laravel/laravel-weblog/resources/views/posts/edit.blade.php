@extends('layouts.app')

@section('title', 'Edit Post')

@section('content')
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Update post / {{ $post->title }}</h1>
            <form action="{{ route('posts.destroy', $post) }}" method="POST">
                @csrf
                @method("DELETE")
                <button class="button delete" type="submit">Delete</button>
            </form>
        </div>
    </div>

    <form class="form" action="{{ route('posts.update', $post) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="title">Title</label>
        <input type="text" name="title" id="title" value="{{ $post->title }}" required>
        <label for="content">Content</label>
        <textarea name="content" id="content">{{ $post->content }}</textarea>
        <label for="categories">Categories:</label>
        <select id="categories" name="categories[]" required multiple>
@foreach($categories as $category)
            <option value="{{ $category->id }}" {{ $post->categories->contains($category->id) ? 'selected' : '' }}>
                {{ $category->name }}
            </option>
@endforeach
        </select>

@can('setPremium', App\Models\Post::class)
        <div class="checkbox-container" title="Premium posts can only be read by users with a premium subscription">
            <input type="checkbox" name="is_premium" id="is_premium" {{ $post->is_premium ? 'checked' : '' }}>
            <label for="is_premium">Premium Post</label>
        </div>
@endcan
@can('setPinned', App\Models\Post::class)        
        <div class="checkbox-container" title="Featured posts are placed first in a set of posts">
            <input type="checkbox" name="is_pinned" id="is_pinned" {{ $post->is_pinned ? 'checked' : '' }}>
            <label for="is_pinned">Featured Post</label>
        </div>
@endcan          
              
@if ($errors->any())
        <div class="error-list">
            <ul>
@foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
@endforeach
            </ul>
        </div>
@endif
        <button class="button" type="submit">Update</button>
    </form> 
@endsection