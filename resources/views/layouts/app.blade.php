<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @vite(['resources/sass/app.scss', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="position-relative" data-theme="default" data-layout="fluid" data-sidebar-position="left" data-sidebar-layout="default">
    @inertia
</body>
</html>
