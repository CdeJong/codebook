@extends('layouts.app')

@section('title', 'Posts')

@section('content')
    <div class="title-bar">
        <h1 class="title">Posts</h1>
        <a class="button" href="{{ route('posts.create') }}">Create New Post</a>
    </div>
    
    <div class="filter-bar">
        <form action="{{ route('posts.index') }}" method="GET">
            <select name="category">
                <option value="">Show all categories</option>
@foreach($categories as $category)
                <option value="{{ $category->id }}" {{ request('category') == $category->id ? 'selected' : '' }}>
                    {{ $category->name }}
                </option>
@endforeach
            </select>
            <button class="button" type="submit">Filter</button>
        </form>
    </div>

    <div class="post-gallery">
@foreach($posts as $post)
        <a class="post" href="{{ route('posts.show', $post) }}">
            <div class="post-ribbons">
@if($post->is_pinned)
                <div class="featured">FEATURED</div>
@endif
@if($post->is_premium)
                <div class="premium">PREMIUM</div>
@endif
            </div>
            <img src="{{ asset('temp/images/banner.jpg') }}" alt="temp image while im implementing this feature">
            <div class="post-bottom">
                <div class="post-meta">
                    <h2 class="post-title" title="{{ $post->title }}">{{ $post->title }}</h2>
                    <div class="post-categories">
@foreach($post->categories as $category)
                        <div>{{ $category->name }}</div>
@endforeach                        
                    </div>
                    <div class="post-author">{{ $post->user->username }}</div>
                    <div class="post-time" title="Created at {{ $post->fancy_created_at }}, Last updated at {{ $post->fancy_updated_at }}">{{ $post->fancy_created_at }}</div>
                </div>
            </div>
        </a>
@endforeach
    </div>

@endsection