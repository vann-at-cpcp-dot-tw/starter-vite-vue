<?php
define('ROOT', './');
define('ASSETS_BASE', '/');
define('MANIFEST_JSON', ROOT . 'manifest.json');

function getAssetsPrefix(){
    return ASSETS_BASE;
}

function vite(string $entry): string
{
    return "\n" . jsTag($entry)
        . "\n" . jsPreloadImports($entry)
        . "\n" . cssTag($entry);
}

function jsTag(string $entry): string
{
    $url = assetUrl($entry);

    if (!$url) {
        return '';
    }

    return '<script type="module" crossorigin src="'
        . $url
        . '"></script>';
}

function jsPreloadImports(string $entry): string
{

    $res = '';
    foreach (importsUrls($entry) as $url) {
        $res .= '<link rel="modulepreload" href="'
            . $url
            . '">';
    }
    return $res;
}

function cssTag(string $entry): string
{

    $tags = '';
    foreach (cssUrls($entry) as $url) {
        $tags .= '<link rel="stylesheet" href="'
            . $url
            . '">';
    }
    return $tags;
}


// Helpers to locate files

function getManifest(): array
{
    $file = file_exists(MANIFEST_JSON);
    $content = $file ? file_get_contents(MANIFEST_JSON) : '{}';
    return json_decode($content, true);
}

function assetUrl(string $entry): string
{
    $manifest = getManifest();
    return isset($manifest[$entry])
        ? getAssetsPrefix() . $manifest[$entry]['file']
        : '';
}

function importsUrls(string $entry): array
{
    $urls = [];
    $manifest = getManifest();

    if (!empty($manifest[$entry]['imports'])) {
        foreach ($manifest[$entry]['imports'] as $imports) {
            $urls[] = getAssetsPrefix() . $manifest[$imports]['file'];
        }
    }
    return $urls;
}

function cssUrls(string $entry): array
{
    $urls = [];
    $manifest = getManifest();

    if (!empty($manifest[$entry]['css'])) {
        foreach ($manifest[$entry]['css'] as $file) {
            $urls[] = getAssetsPrefix() . $file;
        }
    }
    return $urls;
}
