<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    @if (env('DEV'))
        <link type="text/css" rel="stylesheet" href="css/styles-min.css?v={{ time() }}">
    @else
        <link type="text/css" rel="stylesheet" href="css/styles-min.css?v={{ env('APP_VER') }}">
    @endif
    <title>Title</title>
</head>
<body>
<div id="header"></div>
<div id="navigationMenu"></div>
<div class="container">
    <div class="breadcrumbs-container">
        <ol class="breadcrumb">
            <li><a href="#">Главная</a></li>
            <li><a href="#">Библиотека</a></li>
            <li class="active">Данные</li>
        </ol>
    </div>
    <div id="content"></div>
</div>
<div class="footer"></div>


@if (env('DEV'))
    <script src="js/bundle.js?v={{ time() }}"></script>
@else
    <script src="js/bundle.js?v={{ env('APP_VER') }}"></script>
@endif
</body>
</html>