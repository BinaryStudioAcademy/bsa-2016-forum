<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\AvatarService;

class AvatarServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        \App::bind('AvatarService', function()
        {
            return new AvatarService;
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