<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    @if (env('APP_EXTERNAL_HEADER'))
    <link type="text/css" rel="stylesheet" href="http://team.binary-studio.com/app/styles/css/style.css">
    @endif
    @if (env('APP_DEBUG'))
        <link type="text/css" rel="stylesheet" href="css/styles.css?v={{ time() }}">
    @else
        <link type="text/css" rel="stylesheet" href="css/styles.css?v={{ env('APP_VER') }}">
    @endif
    <title>BSA16: Forum</title>
</head>
<body>
@if (env('APP_EXTERNAL_HEADER'))
    <script src="http://team.binary-studio.com/app/javascripts/header.js"></script>
@endif

@if (env('APP_DEBUG'))
    <script src="js/bundle.js?v={{ time() }}"></script>
@else
    <script src="js/bundle.js?v={{ env('APP_VER') }}"></script>
@endif
</body>
</html>
