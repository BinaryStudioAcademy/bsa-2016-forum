<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\CurlService;

class CurlServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        \App::bind('CurlService', function()
        {
            return new CurlService;
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}