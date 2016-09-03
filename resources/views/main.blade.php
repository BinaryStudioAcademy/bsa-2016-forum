<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    @if (env('APP_DEBUG'))
        <link type="text/css" rel="stylesheet" href="css/styles.css?v={{ time() }}">
    @else
        <link type="text/css" rel="stylesheet" href="css/styles.css?v={{ env('APP_VER') }}">
    @endif
    <link rel="stylesheet" href="css/font-size-icons.css">
    <title>Title</title>
</head>
<body>

@if (env('APP_DEBUG'))
    <script src="js/bundle.js?v={{ time() }}"></script>
@else
    <script src="js/bundle.js?v={{ env('APP_VER') }}"></script>
@endif
</body>
</html>
