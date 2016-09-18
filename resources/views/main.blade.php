<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link type="text/css" rel="stylesheet" href="http://team.binary-studio.com/app/styles/css/style.css">
    @if (env('APP_DEBUG'))
        <link type="text/css" rel="stylesheet" href="css/styles.css?v={{ time() }}">
    @else
        <link type="text/css" rel="stylesheet" href="css/styles.css?v={{ env('APP_VER') }}">
    @endif
    <title>BSA16: Forum</title>
</head>
<body>
<script src="http://team.binary-studio.com/app/javascripts/header.js"></script>
@if (env('APP_DEBUG'))
    <script src="js/bundle.js?v={{ time() }}"></script>
@else
    <script src="js/bundle.js?v={{ env('APP_VER') }}"></script>
@endif
</body>
</html>
