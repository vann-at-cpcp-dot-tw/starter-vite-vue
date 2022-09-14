<?php
define('ROOT', './');
define('ASSETS_BASE', ROOT);
define('MANIFEST_JSON', ROOT . 'manifest.json');
define('DEV_BASE', 'http://localhost:5173/');

function isDev(string $entry = ''): bool{
    // This method is very useful for the local server
    // if we try to access it, and by any means, didn't started Vite yet
    // it will fallback to load the production files from manifest
    // so you still navigate your site as you intended!

    static $exists = null;
    if ($exists !== null) {
        return $exists;
    }

    $handle = curl_init(DEV_BASE . $entry);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handle, CURLOPT_NOBODY, true);

    curl_exec($handle);
    $error = curl_errno($handle);
    curl_close($handle);

    return $exists = !$error;
}

function vite(string $entry): string{
    return "\n" . jsTag($entry)
        . "\n" . jsPreloadImports($entry)
        . "\n" . cssTag($entry);
}

function jsTag(string $entry): string {

    $url = isDev($entry)
    ? DEV_BASE . $entry
    : assetUrl($entry);

    if (!$url) {
        return '';
    }
    return '<script type="module" crossorigin src="'
        . $url
        . '"></script>';
}

function jsPreloadImports(string $entry): string{

    if (isDev($entry)) {
        return '';
    }

    $res = '';
    foreach (importsUrls($entry) as $url) {
        $res .= '<link rel="modulepreload" href="'
            . $url
            . '">';
    }
    return $res;
}

function cssTag(string $entry): string{

    // not needed on dev, it's inject by Vite
    if (isDev($entry)) {
        return '';
    }

    $tags = '';
    foreach (cssUrls($entry) as $url) {
        $tags .= '<link rel="stylesheet" href="'
            . $url
            . '">';
    }
    return $tags;
}


// Helpers to locate files
function getManifest(): array{
    $file = file_exists(MANIFEST_JSON);
    $content = $file ? file_get_contents(MANIFEST_JSON) : '{}';
    return json_decode($content, true);
}

function assetUrl(string $entry): string{
    $manifest = getManifest();
    return isset($manifest[$entry])
        ? ASSETS_BASE . $manifest[$entry]['file']
        : '';
}

function importsUrls(string $entry): array{
    $urls = [];
    $manifest = getManifest();

    if (!empty($manifest[$entry]['imports'])) {
        foreach ($manifest[$entry]['imports'] as $imports) {
            $urls[] = ASSETS_BASE . $manifest[$imports]['file'];
        }
    }
    return $urls;
}

function cssUrls(string $entry): array{
    $urls = [];
    $manifest = getManifest();

    if (!empty($manifest[$entry]['css'])) {
        foreach ($manifest[$entry]['css'] as $file) {
            $urls[] = ASSETS_BASE . $file;
        }
    }
    return $urls;
}


