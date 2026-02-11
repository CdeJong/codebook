@extends('layouts.app')

@section('title', 'Categories')

@section('content')

    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Categories</h1>
            <a class="button" href="{{ route('categories.create') }}">Create New Category</a>
        </div>
    </div>
    
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Post count</th>
                <th>Created at</th>
                <th colspan="2"></th>
            </tr>
        </thead>
        <tbody>
@foreach($categories as $category)
            <tr>
                <td>{{ $category->name }}</td>
                <td class="numeric">{{ $category->posts_count }}</td>
                <td>{{ $category->created_at }}</td>
                <td>
                    <a href="{{ route('categories.edit', $category) }}" class="button">Edit</a>
                </td>
                <td>
                    <form action="{{ route('categories.destroy', $category) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button class="button delete" type="submit">Delete</button>
                    </form>
                </td>
            </tr>
@endforeach
        </tbody>
    </table>
@endsection