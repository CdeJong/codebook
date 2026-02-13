@extends('layouts.app')

@section('title', 'Post')

@section('content')
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Posts / {{ $post->title }}</h1>
@can('update', $post)        
            <a class="button" href="{{ route('posts.edit', $post) }}">Edit</a>
@endcan
@can('delete', $post)        
            <form action="{{ route('posts.destroy', $post) }}" method="POST">
                @csrf
                @method("DELETE")
                <button class="button delete" type="submit">Delete</button>
            </form>
@endcan
        </div>
        <div class="secondary-header">
            <p class="title">Posted by {{ $post->user->username }} at {{ $post->formatted_created_at }}</p>
            <div class="post-ribbons">
@if($post->is_pinned)
                <div class="featured">FEATURED</div>
@endif
@if($post->is_premium)
                <div class="premium">PREMIUM</div>
@endif
            </div>
        </div>
    </div>

@can('viewPremiumContent', $post)    
    <div class="post-content markdown-body">
        {!! $post->content_html !!}
    </div>
@else
    <div class="post-content">
        <p>Oops this is a premium post! Get Premium to read all our premium content! <a class="button premium" href="#">Get Premium</a>
    </div>
@endcan    

    <div class="categories">
@foreach($post->categories as $category)
        <div class="category">{{ $category->name }}</div>
@endforeach
    </div>

@can('viewPremiumContent', $post) 
    <form class="form" action="{{ route('comments.store') }}" method="POST">
        @csrf
        <input type="hidden" name="post_id" value="{{ $post->id }}" autocomplete="off">
        <textarea name="content" placeholder="Post a new comment...">{{ old('content') }}</textarea>
@if ($errors->any())
        <div class="error-list">
            <ul>
@foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
@endforeach
            </ul>
        </div>
@endif
        <button class="button" type="submit">Post Comment</button>
    </form>
@endcan    

    <div class="comments">
        <h3 class="comments-title">Comments ({{ count($comments) }}):</h3>
@foreach($comments as $comment)
        <div class="comment">
            <div class="comment-header">
                <div class="comment-author">{{ $comment->user->username }}</div>
                <div class="comment-time">{{ $comment->formatted_created_at }}</div>
            </div>
            <hr>
            <div class="comment-content markdown-body">{!! $comment->content_html !!}</div>
        </div>
@endforeach        
    </div>
@endsection