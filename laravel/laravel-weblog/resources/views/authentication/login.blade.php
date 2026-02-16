@extends('layouts.app')

@section('title', 'Login')

@section('content')
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Login</h1>
        </div>
    </div>

    <div class="page-content">
        <p>Welcome back! Log in to join the conversation, create your own posts, and show your support by upgrading to premium.</p>
        <p>Don't have an account yet? <a href="{{ route('register') }}">Sign up here</a>, it only takes a moment!</p>
    </div>
    
    <form class="form" action="{{ route('auth.login') }}" method="POST">
        @csrf
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" value="{{ old('email') }}" required>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required>

@if ($errors->any())
        <div class="error-list">
            <ul>
@foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
@endforeach
            </ul>
        </div>
@endif
        <button class="button" type="submit">Login</button>
    </form>
@endsection