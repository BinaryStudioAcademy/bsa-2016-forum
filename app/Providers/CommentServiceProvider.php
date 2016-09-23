<?php
/**
 * Created by PhpStorm.
 * User: lyudmila
 * Date: 23.09.16
 * Time: 14:42
 */

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\CommentService;

class CommentServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        \App::bind('CommentService', function()
        {
            return new CommentService;
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