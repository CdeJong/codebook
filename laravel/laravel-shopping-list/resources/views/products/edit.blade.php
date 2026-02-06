@extends('layouts.app')

@section('title', 'Edit Product')

@section('content')
    <h1 class="title">Edit Product</h1>
    <form action="{{ route('product.update', $product->id)  }}" method="POST">
        @csrf
        @method('PUT')
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="{{ $product->name }}" required>
        <label for="description">Description:</label>
        <textarea id="description" name="description">{{ $product->description }}</textarea>
        <select id="category" name="category_id" required>
        @foreach($categories as $category)
            <option value="{{ $category->id }}" {{ $product->category_id == $category->id ? 'selected' : '' }}>
                {{ $category->name }}
            </option>
        @endforeach    
        </select>
        <button type="submit">Update</button>
    </form>
@endsection