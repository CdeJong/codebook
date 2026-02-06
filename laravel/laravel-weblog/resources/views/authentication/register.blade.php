@extends('layouts.app')

@section('title', 'Register')

@section('content')
    <div class="title-bar">
        <h1 class="title">Register: Create a new account!</h1>
    </div>
    
    <form class="form" action="{{ route('auth.register') }}" method="POST">
        @csrf
        <label for="username">Username</label>
        <input type="text" name="username" id="username" value="{{ old('username') }}" minlength="4" maxlength="16" required>
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
        <button class="button" type="submit">Register</button>
    </form>
@endsection