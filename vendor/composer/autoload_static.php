<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit02a90a915e87a2ec364014d58e081fe1
{
    public static $prefixLengthsPsr4 = array (
        'c' => 
        array (
            'calderawp\\convertKit\\' => 21,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'calderawp\\convertKit\\' => 
        array (
            0 => __DIR__ . '/..' . '/calderawp/convertkit-api/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit02a90a915e87a2ec364014d58e081fe1::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit02a90a915e87a2ec364014d58e081fe1::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit02a90a915e87a2ec364014d58e081fe1::$classMap;

        }, null, ClassLoader::class);
    }
}
