@extends('layouts.app')

@section('title', 'Create Product')

@section('content')
    <h1 class="title">Create Product</h1>
    <form action="{{ route('product.store') }}" method="POST">
        @csrf
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="description">Description:</label>
        <textarea id="description" name="description"></textarea>
        <label for="category">Category:</label>
        <select id="category" name="category_id" required>
        @foreach($categories as $category)
            <option value="{{ $category->id }}">{{ $category->name }}</option>
        @endforeach    
        </select>
        <button type="submit">Save</button>
    </form>
@endsection