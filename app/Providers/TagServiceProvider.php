<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\TagService;

class TagServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        \App::bind('TagService', function()
        {
            return new TagService;
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
