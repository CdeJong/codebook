<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') - Shopping List</title>
    <link rel="stylesheet" href="{{ asset('/css/style.css') }}">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
<body>
    @include('partials.navigation')   
    <div class="container">
        @yield('content')
    </div>
</body>
</html>    
