@extends('layouts.app')

@section('title', 'Create Post')

@section('content')
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Create a new post</h1>
        </div>
    </div>

    <form class="form" action="{{ route('posts.store') }}" method="POST">
        @csrf
        <label for="title">Title</label>
        <input type="text" name="title" id="title" value="{{ old('title') }}" required>
        <label for="content">Content</label>
        <textarea name="content" id="content">{{ old('content') }}</textarea>
        <label for="categories">Categories:</label>
        <select id="categories" name="categories[]" required multiple>
@foreach($categories as $category)
            <option value="{{ $category->id }}" {{ in_array($category->id, old('categories', [])) ? 'selected' : '' }}>{{ $category->name }}</option>
@endforeach    
        </select>
@can('setPremium', App\Models\Post::class)
        <div class="checkbox-container" title="Premium posts can only be read by users with a premium subscription">
            <input type="checkbox" name="is_premium" id="is_premium" {{ empty(old('is_premium')) ? '' : 'checked="on"' }}>
            <label for="is_premium">Premium Post</label>
        </div>
@endcan
@can('setPinned', App\Models\Post::class)        
        <div class="checkbox-container" title="Featured posts are placed first in a set of posts">
            <input type="checkbox" name="is_pinned" id="is_pinned" {{ empty(old('is_pinned')) ? '' : 'checked="on"' }}>
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
        <button class="button" type="submit">Create</button>
    </form>     
@endsection