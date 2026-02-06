<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('/css/styles.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/github-markdown-light.css') }}">
    <title>@yield('title') - Weblog</title>
</head>
<body>
    @include('partials.navigation')
    <div class="container">
    @yield('content')
    </div>
</body>
</html>