@extends('layouts.app')

@section('title', 'Home')

@section('content')
    <div class="title-bar">
        <h1 class="title">Featured Posts!</h1>
    </div>

@include('partials.post-gallery', ['posts' => $pinned_posts])

    <div class="title-bar">
        <h1 class="title">{{ $posts_category->name }} related posts!</h1>
        <a class="button" href="{{ route('posts.index', ['category' => $posts_category]) }}">View More</a>
    </div>

@include('partials.post-gallery', ['posts' => $category_posts])
    
    <div class="title-bar">
        <h1 class="title">Premium Posts!</h1>
        <a class="button premium" href="{{ route('premium.show') }}">Get Premium</a>
    </div>

@include('partials.post-gallery', ['posts' => $premium_posts])
    
@endsection