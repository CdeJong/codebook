@extends('layouts.app')

@section('title', 'Products')

@section('content')
<h1 class="title">Product Overview</h1>
<table>
    <thead>
        <tr>
            <th>Product</th>
            <th>Category</th>
            <th colspan="3" >Description</th>
        </tr>
    </thead>
    <tbody>
@foreach($products as $product)
        <tr title="Created at {{ $product->created_at }}" >
            <td class="short-text" title="{{ $product->name }}">{{ $product->name }}</td>
            <td class="short-text" title="{{ $product->category->name }}">{{ $product->category->name }}</td>
            <td class="long-text" title="{{ $product->description }}">{{ $product->description }}</td>
            <td>
                <a class="edit button" href="{{ route('product.edit', $product->id) }}">Edit</a>
            </td>
            <td>
                <form action="{{ route('product.destroy', $product->id) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <button class="delete" type="submit">Delete</button>
                </form>
            </td>
        </tr>
@endforeach
    </tbody>
</table>
@endsection