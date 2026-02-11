@extends('layouts.app')

@section('title', 'Edit Category')

@section('content')

    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Update category / {{ $category->name }}</h1>
            <form action="{{ route('categories.destroy', $category) }}" method="POST">
                @csrf
                @method('DELETE')
                <button class="button delete" type="submit">Delete</button>
            </form>
        </div>
    </div>
    
    <form class="form" action="{{ route('categories.update', $category) }}" method="POST">
        @csrf
        @method('PUT')
        <label for="name">Name</label>
        <input type="text" name="name" id="name" value="{{ $category->name }}" required>

@if ($errors->any())
        <div class="error-list">
            <ul>
@foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
@endforeach
            </ul>
        </div>
@endif
        <button class="button" type="submit">Update</button>
    </form>
@endsection