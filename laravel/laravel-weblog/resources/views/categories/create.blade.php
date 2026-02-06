@extends('layouts.app')

@section('title', 'Create Category')

@section('content')
    <div class="title-bar">
        <h1 class="title">Create a new category</h1>
    </div>
    
    <form class="form" action="{{ route('categories.store') }}" method="POST">
        @csrf
        <label for="name">Name</label>
        <input type="text" name="name" id="name" value="{{ old('name') }}" required>

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