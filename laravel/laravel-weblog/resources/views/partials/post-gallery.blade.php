<div class="post-gallery">
@foreach($posts as $post)
    <a class="post" href="{{ route('posts.show', $post) }}">
        <div class="post-ribbons">
@if($post->is_pinned)
            <div class="featured">FEATURED</div>
@endif
@if($post->is_premium)
            <div class="premium">PREMIUM</div>
@endif
        </div>
        <img src="{{ asset('temp/images/banner.jpg') }}" alt="temp image while im implementing this feature">
        <div class="post-bottom">
            <div class="post-meta">
                <h2 class="post-title" title="{{ $post->title }}">{{ $post->title }}</h2>
                <div class="post-categories">
@foreach($post->categories as $category)
                    <div>{{ $category->name }}</div>
@endforeach                        
                </div>
                <div class="post-author">{{ $post->user->username }}</div>
                <div class="post-time" title="Created at {{ $post->fancy_created_at }}, Last updated at {{ $post->fancy_updated_at }}">{{ $post->fancy_created_at }}</div>
            </div>
        </div>
    </a>
@endforeach
</div>