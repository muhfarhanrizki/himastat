<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title inertia>{{ config('app.name', 'Himastat') }}</title>
        <meta name="description" content="Himpunan Mahasiswa Statistika Unhas - Website Resmi Himastat">
        <meta name="keywords" content="Himastat, Himastat Unhas, Himastat FMIPA Unhas, FMIPA, Unhas, Universitas Hasanuddin, Statistika Unhas, Himpunan Mahasiswa Statistika, Organisasi Mahasiswa Unhas, Himpunan Mahasiswa Statistika Unhas, Website Himpunan, Mahasiswa Statistika Unhas">

        <meta property="og:title" content="@yield('title', 'Himpunan Mahasiswa Statistika Unhas - Website Resmi Himastat')">
        <meta property="og:description" content="@yield('meta_description', 'Website Resmi Himastat Unhas')">
        <meta property="og:image" content="@yield('og_image', asset('favicon.svg'))">
        <meta property="og:url" content="{{ url()->current() }}">

        <link rel="canonical" href="{{ url()->current() }}">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
