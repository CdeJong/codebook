@extends('layouts.app')

@section('title', 'Posts')

@section('content')
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Posts</h1>
            <a class="button" href="{{ route('posts.create') }}">Create New Post</a>
        </div>
        <div class="secondary-header">
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
    </div>

    <!-- <div class="title-bar">
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
    </div> -->

@include('partials.post-gallery', ['posts' => $posts])

@endsection