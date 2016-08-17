<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\AttachmentService;

class AttachmentServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        \App::bind('AttachmentService', function()
        {
            return new AttachmentService;
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
