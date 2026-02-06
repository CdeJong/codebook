@extends('layouts.app')

@section('title', 'Profile')

@section('content')
    <div class="title-bar">
        <h1 class="title">Your Profile!</h1>
    </div>

    <div>
        <p>Username: {{ auth()->user()->username }}</p>
        <p>Premium: {{ auth()->user()->has_premium ? 'Active' : 'Inactive' }}</p>
@if (auth()->user()->has_premium)
        <p>Expires At: {{ auth()->user()->premium_expires_at }}</p>      
@endif  
    </div>

    <div class="title-bar">
        <h1 class="title">Your posts!</h1>
    </div>
    
        <div class="post-gallery">
@foreach($posts as $post)
        <a class="post" href="{{ route('posts.show', $post) }}">
            <img src="{{ asset('temp/images/banner.jpg') }}" alt="">
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