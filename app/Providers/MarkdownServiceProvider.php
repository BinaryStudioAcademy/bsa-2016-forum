<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\MarkdownService;

class MarkdownServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        \App::bind('MarkdownService', function()
        {
            return new MarkdownService;
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
