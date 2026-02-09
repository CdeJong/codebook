<header>
    <nav class="container">
        <ul>
            <li><a href="{{ route('home.show') }}">Home</a></li>
            <li><a href="{{ route('posts.index') }}">Posts</a></li>
@can('viewAny', App\Models\Category::class)            
            <li><a href="{{ route('categories.index') }}">Categories</a></li>
@endcan
        </ul>

        <ul>
            <li style="align-content: center;"><div><a class="button premium" href="{{ route('premium.show') }}">GET PREMIUM</a></div></li>
@auth
            <li><a href="{{ route('profile.show') }}">{{ auth()->user()->username }}</a></li>
            <li>
                <form action="{{ route('auth.logout') }}" method="POST">
                    @csrf
                    <button type="submit">Logout</button>
                </form>
            </li> 
@endauth
@guest
            <li><a href="{{ route('login') }}">Login</a></li>
            <li><a href="{{ route('register') }}">Register</a></li>
@endguest
        </ul>
    </nav>
</header>