@extends('layouts.app')

@section('title', 'Home')

@section('content')
    <div class="title-bar">
        <h1 class="title">Featured Posts!</h1>
    </div>

    <div class="post-gallery">
@foreach($pinned_posts as $post)
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
                    <div class="post-time" title="Created at {{ $post->created_at }}, Last updated at {{ $post->updated_at }}">{{ $post->created_at->diffForHumans() }}</div>
                </div>
            </div>
        </a>
@endforeach
    </div>

    <div class="title-bar">
        <h1 class="title">{{ $posts_category->name }} related posts!</h1>
        <a class="button" href="{{ route('posts.index', ['category' => $posts_category]) }}">View More</a>
    </div>

    <div class="post-gallery">
@foreach($category_posts as $post)
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
                    <div class="post-time" title="Created at {{ $post->created_at }}, Last updated at {{ $post->updated_at }}">{{ $post->created_at->diffForHumans() }}</div>
                </div>
            </div>
        </a>
@endforeach
    </div>
    
    <div class="title-bar">
        <h1 class="title">Premium Posts!</h1>
        <a class="button premium" href="#">Get Premium</a>
    </div>

    <div class="post-gallery">
@foreach($premium_posts as $post)
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
                    <div class="post-time" title="Created at {{ $post->created_at }}, Last updated at {{ $post->updated_at }}">{{ $post->created_at->diffForHumans() }}</div>
                </div>
            </div>
        </a>
@endforeach
    </div>
    
@endsection