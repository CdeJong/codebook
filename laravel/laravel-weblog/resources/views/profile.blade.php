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
    
@include('partials.post-gallery', ['posts' => $posts])

@endsection