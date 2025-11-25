<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Title from Inertia Head -->
    <title inertia>{{ config('app.name', 'Himpunan Mahasiswa Statistika Unhas') }}</title>

    <!-- Default SEO Fallback (halaman yang tidak override Head) -->
    <meta name="description" content="Himpunan Mahasiswa Statistika Unhas - Website Resmi Himastat">
    <meta name="keywords" content="Himastat, Himastat Unhas, Himpunan Mahasiswa Statistika, Statistika Unhas, FMIPA Unhas">

    <!-- Google Verification -->
    <meta name="google-site-verification" content="c8eCa8HyWDraa0Kz8Fc6RxNfNULg4bUoIoQ03OY5UxQ" />

    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Open Graph Default -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Himpunan Mahasiswa Statistika Unhas - Website Resmi Himastat">
    <meta property="og:description" content="Website Resmi Himastat Unhas">
    <meta property="og:image" content="{{ asset('favicon.svg') }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:site_name" content="Himastat Unhas">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Himastat Unhas - Website Resmi">
    <meta name="twitter:description" content="Himpunan Mahasiswa Statistika Unhas - Website Resmi">
    <meta name="twitter:image" content="{{ asset('favicon.svg') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet">

    <!-- Icons -->
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="MyWebSite" />
    <link rel="manifest" href="/site.webmanifest" />

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
